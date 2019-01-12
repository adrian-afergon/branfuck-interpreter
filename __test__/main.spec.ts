import { runBrainfuck } from '../src/main';

describe('runBrainfuck', () => {
  it('should doesn\'t break with unexpected character', () => {
    expect(runBrainfuck('#')).toEqual('');
  });

  it('should render an "A"', () => {
    expect(runBrainfuck('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.')).toEqual('A');
  });

  it('should render an "AA"', () => {
    expect(runBrainfuck('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++..')).toEqual('AA');
  });

  it('should render an "ABC"', () => {
    expect(runBrainfuck('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+.+.')).toEqual('ABC');
  });

  it('shuld runs basic Brainfuck programs', () => {
    expect(runBrainfuck('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+.')).toEqual('HI');
    expect(runBrainfuck('+++++++++++++++++++++++++++++++++++++++++++++++++++++.-.-.-.-.')).toEqual('54321');
  });

  it ('should move right over the registers', () => {
    expect(runBrainfuck('++++++>++++++++++++++++++++++++++++++++++++++++++++++++.')).toEqual('0')
  })

  it ('should move left over the registers', () => {
    expect(runBrainfuck('>++++++<++++++++++++++++++++++++++++++++++++++++++++++++.')).toEqual('0')
  })

  it ('should move left over the registers', () => {
    expect(() => runBrainfuck('<')).toThrowError()
  })

  it ('should throw an error', () => {
    expect(() => runBrainfuck(`
      >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      +
    `)).toThrowError()
  })

  it ('should jump with the []', () => {
    expect(runBrainfuck(`
      ++++++
      [
          > ++++++++++
      < -
      ]
      >
      +++++
      .
    `)).toEqual('A')
  })

  it ('should returns a hello world message', () => {
    expect(runBrainfuck(`
      ++++++++++
      [              Bucle para iniciar las memorias (se repite 10 veces)
        >+++++++>++++++++++>+++++++++++>+++>+<<<<<-
            70        100       110      30  10
      ]
      >++.              imprime 'H'   (72) 1
      >>+.              imprime 'o'  (111) 3
      ---.                      'l'  (108) 3
      <---.                     'a'   (97) 2
      >>++.                   espacio (32) 4
      <+.                       'm'  (109) 3
      ++++++++.                 'u'  (117) 3
      -------.                  'n'  (110) 3
      <+++.                     'd'  (100) 2
      >+.                       'o'  (111) 3
      >+.                       '!'   (33) 4
    `)).toEqual('Hola mundo!')
  })

  // it('Can handle input as a secondary argument', () => {
  //   expect(runBrainfuck(',.', 'A')).toEqual('A');
  //   expect(runBrainfuck(',>,>,>,>,.<.<.<.<.', 'olleH')).toEqual('Hello');
  // });

  // it('Can handle more complex programs with loops', () => {
  //   expect(runBrainfuck('++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.')).toEqual('Hello World!');
  // });
});