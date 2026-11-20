import { describe, expect, it } from 'vitest';
import {
  addBoardNode,
  askTopic,
  createInitialState,
  examineDocument,
  inspectHotspot,
  linkBoardNodes,
  presentEvidence,
  startInterview,
  submitTheory,
  theoryReadiness,
  type GameState,
} from './engine';
import { caseFile } from './case';

/**
 * A cold start, played through the same functions the interface calls.
 * If this passes, the case has no dead ends: every clue the theory needs is
 * reachable from the five photographs, the five documents and the interviews,
 * and the board accepts the connections that produce the required insights.
 */
describe('full walkthrough', () => {
  it('reaches a solved case from an empty save', () => {
    let state: GameState = createInitialState(1_000);

    // 1. Examine every photograph.
    for (const photo of caseFile.photos) {
      for (const spot of photo.hotspots) {
        state = inspectHotspot(state, photo.id, spot.id).state;
      }
    }
    expect(state.discoveredClueIds.length).toBeGreaterThan(10);

    // 2. Read every document.
    for (const document of caseFile.documents) {
      state = examineDocument(state, document.id);
    }

    // 3. Meet everyone and exhaust the topics that are available.
    for (const person of caseFile.people) {
      state = startInterview(state, person.id);
      for (let pass = 0; pass < 3; pass += 1) {
        for (const topic of person.topics) {
          state = askTopic(state, person.id, topic.id);
        }
      }
    }

    // 4. Put every piece of evidence to every witness. Contradictions unlock
    //    new statements, so repeat until the evidence list stops growing.
    for (let round = 0; round < 4; round += 1) {
      const before = state.discoveredClueIds.length;
      const evidence = [...state.discoveredClueIds];
      for (const person of caseFile.people) {
        for (const clueId of evidence) {
          state = presentEvidence(state, person.id, clueId).state;
        }
      }
      if (state.discoveredClueIds.length === before) break;
    }

    // Contradictions are only reachable when both halves are known.
    expect(state.discoveredClueIds).toContain('st_voss_brooch_lent');
    expect(state.discoveredClueIds).toContain('st_voss_crate_sealed');
    expect(state.discoveredClueIds).toContain('st_renn_admission');

    // 5. Make the four intended connections on the board.
    let x = 80;
    for (const rule of caseFile.deductions) {
      state = addBoardNode(state, rule.a, x, 80);
      state = addBoardNode(state, rule.b, x + 220, 80);
      const link = linkBoardNodes(state, rule.a, rule.b, rule.label);
      state = link.state;
      expect(link.error, `connection ${rule.id} should be accepted`).toBeUndefined();
      expect(link.validation?.insightId).toBe(rule.insightId);
      x += 20;
    }

    const readiness = theoryReadiness(state);
    expect(readiness.ready, `missing: ${readiness.missing.join(', ')}`).toBe(true);

    // 6. Answer the theory correctly.
    const answers = Object.fromEntries(
      caseFile.theoryQuestions.map((question) => [question.id, question.correct]),
    );
    const verdict = submitTheory(state, answers);
    expect(verdict.blocked).toBeUndefined();
    expect(verdict.solved).toBe(true);
    expect(verdict.state.theory.solved).toBe(true);
  });
});
