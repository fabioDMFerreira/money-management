
import { createRule, removeRule, updateRule } from './rulesActions';
import rulesReducer from './rulesReducer';


describe('rulesReducer', () => {
  it('should add rules', () => {
    const actual = rulesReducer(
      undefined,
      createRule({
        pattern: {
          field: 'description',
          value: 'car mortage',
        },
        rule: {
          field: 'tags',
          value: 'car',
        },
      }),
    );

    expect(actual.rules[0].pattern).toEqual({
      field: 'description',
      value: 'car mortage',
    });

    expect(actual.rules[0].rule).toEqual({
      field: 'tags',
      value: 'car',
    });
  });

  it('should update rules', () => {
    const state = {
      rules: [{
        id: '1',
        pattern: {
          field: 'description',
          value: 'car mortage',
        },
        rule: {
          field: 'tags',
          value: 'car',
        },
      }],
    };

    const actual = rulesReducer(state, updateRule('1', { rule: { field: 'tags', value: 'car mortage' } }));

    expect(actual.rules[0].pattern).toEqual({
      field: 'description',
      value: 'car mortage',
    });

    expect(actual.rules[0].rule).toEqual({
      field: 'tags',
      value: 'car mortage',
    });
  });

  it('should not update rules if there is no rule with id', () => {
    const state = {
      rules: [{
        id: '1',
        pattern: {
          field: 'description',
          value: 'car mortage',
        },
        rule: {
          field: 'tags',
          value: 'car',
        },
      }],
    };

    const actual = rulesReducer(state, updateRule('5', { rule: { field: 'tags', value: 'car mortage' } }));

    expect(actual).toEqual(state);
  });

  it('should remove rules', () => {
    const state = {
      rules: [{
        id: '1',
        pattern: {
          field: 'description',
          value: 'car mortage',
        },
        rule: {
          field: 'tags',
          value: 'car',
        },
      }],
    };

    const actual = rulesReducer(state, removeRule('1'));
    const expected = { rules: [] };

    expect(actual).toEqual(expected);
  });
});
