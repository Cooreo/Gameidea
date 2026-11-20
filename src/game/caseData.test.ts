import { describe, expect, it } from 'vitest';
import { caseFile } from './case';

const clueIds = new Set(caseFile.clues.map((clue) => clue.id));
const personIds = new Set(caseFile.people.map((person) => person.id));
const statementIds = new Set(caseFile.statements.map((statement) => statement.id));

const unique = (ids: string[]) => new Set(ids).size === ids.length;

describe('case file integrity', () => {
  it('has unique identifiers everywhere', () => {
    expect(unique(caseFile.clues.map((c) => c.id))).toBe(true);
    expect(unique(caseFile.photos.map((p) => p.id))).toBe(true);
    expect(unique(caseFile.documents.map((d) => d.id))).toBe(true);
    expect(unique(caseFile.people.map((p) => p.id))).toBe(true);
    expect(unique(caseFile.statements.map((s) => s.id))).toBe(true);
    expect(unique(caseFile.deductions.map((d) => d.id))).toBe(true);
    expect(
      unique(caseFile.photos.flatMap((photo) => photo.hotspots.map((h) => h.id))),
    ).toBe(true);
  });

  it('documents the parts of the game the brief requires', () => {
    expect(caseFile.photos.length).toBeGreaterThanOrEqual(2);
    expect(caseFile.people.length).toBeGreaterThanOrEqual(3);
    expect(caseFile.documents.length).toBeGreaterThanOrEqual(3);
    expect(
      caseFile.photos.reduce((total, photo) => total + photo.hotspots.length, 0),
    ).toBeGreaterThanOrEqual(8);
    expect(caseFile.theoryRequirements).toHaveLength(3);
  });

  it('points every hotspot at a real clue and keeps hotspots inside the picture', () => {
    for (const photo of caseFile.photos) {
      expect(photo.hints).toHaveLength(2);
      for (const hotspot of photo.hotspots) {
        expect(clueIds.has(hotspot.clueId), `${photo.id}/${hotspot.id}`).toBe(true);
        expect(hotspot.observation.length).toBeGreaterThan(30);
        expect(hotspot.cx - hotspot.r).toBeGreaterThan(0);
        expect(hotspot.cx + hotspot.r).toBeLessThan(photo.width);
        expect(hotspot.cy - hotspot.r).toBeGreaterThan(0);
        expect(hotspot.cy + hotspot.r).toBeLessThan(photo.height);
        const clue = caseFile.clues.find((c) => c.id === hotspot.clueId);
        expect(clue?.photoId).toBe(photo.id);
      }
    }
  });

  it('gives every document a clue card', () => {
    for (const document of caseFile.documents) {
      expect(clueIds.has(document.clueId)).toBe(true);
      const clue = caseFile.clues.find((c) => c.id === document.clueId);
      expect(clue?.documentId).toBe(document.id);
      expect(document.blocks.length).toBeGreaterThan(3);
    }
  });

  it('keeps statements attached to their speaker', () => {
    for (const statement of caseFile.statements) {
      expect(personIds.has(statement.personId)).toBe(true);
      expect(statementIds.has(statement.id)).toBe(true);
      expect(clueIds.has(statement.id)).toBe(true);
      const clue = caseFile.clues.find((c) => c.id === statement.id);
      expect(clue?.kind).toBe('statement');
      expect(clue?.personId).toBe(statement.personId);
    }
  });

  it('validates every deduction pair and its insight', () => {
    for (const deduction of caseFile.deductions) {
      expect(clueIds.has(deduction.a)).toBe(true);
      expect(clueIds.has(deduction.b)).toBe(true);
      expect(deduction.a).not.toBe(deduction.b);
      const insight = caseFile.clues.find((c) => c.id === deduction.insightId);
      expect(insight?.kind).toBe('insight');
    }
    // Each required insight must be reachable through a deduction.
    const produced = new Set(caseFile.deductions.map((d) => d.insightId));
    for (const requirement of caseFile.theoryRequirements) {
      expect(produced.has(requirement.insightId)).toBe(true);
    }
  });

  it('keeps dialogue, unlocks and presented evidence internally consistent', () => {
    for (const person of caseFile.people) {
      const topics = new Set(person.topics.map((topic) => topic.id));
      expect(topics.size).toBe(person.topics.length);
      for (const topic of person.topics) {
        for (const line of topic.lines) {
          if (line.statementId) {
            expect(statementIds.has(line.statementId)).toBe(true);
            expect(
              caseFile.statements.find((s) => s.id === line.statementId)?.personId,
            ).toBe(person.id);
          }
        }
        for (const required of topic.requiresClues ?? []) {
          expect(clueIds.has(required)).toBe(true);
        }
      }
      for (const rule of caseFile.presentations.filter((r) => r.personId === person.id)) {
        expect(clueIds.has(rule.evidenceId)).toBe(true);
        expect(rule.lines.length).toBeGreaterThan(0);
        for (const required of rule.requiresClues ?? []) {
          expect(clueIds.has(required)).toBe(true);
        }
        for (const unlock of rule.unlockTopicIds ?? []) {
          expect(topics.has(unlock), `${person.id} unlock ${unlock}`).toBe(true);
        }
        if (rule.statementId) {
          expect(statementIds.has(rule.statementId)).toBe(true);
        }
        for (const line of rule.lines) {
          if (line.statementId) expect(statementIds.has(line.statementId)).toBe(true);
        }
      }
    }
  });

  it('requires contradictions to be supported by discoverable evidence', () => {
    const contradictions = caseFile.presentations.filter((rule) => rule.contradiction);
    expect(contradictions.length).toBeGreaterThanOrEqual(3);
    for (const rule of contradictions) {
      const clue = caseFile.clues.find((c) => c.id === rule.evidenceId);
      expect(clue).toBeDefined();
      expect(clue?.kind === 'insight' || clue?.kind === 'observation' || clue?.kind === 'statement').toBe(true);
    }
  });

  it('has a solvable theory with a valid option for every answer', () => {
    for (const question of caseFile.theoryQuestions) {
      expect(question.options.length).toBeGreaterThanOrEqual(3);
      expect(question.options.some((option) => option.id === question.correct)).toBe(true);
      expect(unique(question.options.map((option) => option.id))).toBe(true);
      expect(question.feedback.length).toBeGreaterThan(20);
    }
    expect(caseFile.theoryQuestions.length).toBeGreaterThanOrEqual(3);
  });

  it('keeps resolution proof points anchored to real evidence', () => {
    expect(caseFile.resolution.paragraphs.length).toBeGreaterThanOrEqual(4);
    for (const point of caseFile.resolution.proofPoints) {
      expect(clueIds.has(point.evidenceId), point.evidenceId).toBe(true);
    }
    for (const requirement of caseFile.theoryRequirements) {
      expect(caseFile.clues.some((c) => c.id === requirement.insightId)).toBe(true);
    }
  });
});
