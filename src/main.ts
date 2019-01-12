export const runBrainfuck = (text: string): string => {

  const interpreter = new BrainFuckInterpreter();
  interpreter.executeProgram(text)

  return interpreter.print();
}

interface CommandMap {
  [key: string]: string
}

class BrainFuckInterpreter {
  private bufferText: string;
  private currentPointerPosition: number
  private currentProgramPosition: number
  private memory: number[];
  private program: string
  
  static COMMANDS: CommandMap = {
    '+': 'incrementByte',
    '-': 'decrementByte',
    '.': 'writeByteToOutput',
    '>': 'movePointerToRight',
    '<': 'movePointerToLeft',
    '[': 'jumpToNext',
    ']': 'jumpToPrevious',
  }

  constructor (memorySize = 50) {
    this.currentPointerPosition = 0
    this.currentProgramPosition = 0
    this.bufferText = '';
    this.program = '';
    this.memory = new Array(memorySize).fill(0)
  }

  private handleOutOfIndexError () {
    throw new Error(`Memory error: ${this.currentPointerPosition}`)
  }
  
  public executeProgram(program: string) {
    this.program = program

    for (this.currentProgramPosition = 0; this.currentProgramPosition < program.length; this.currentProgramPosition++) {
      const command = program[this.currentProgramPosition];
      const methodName = BrainFuckInterpreter.COMMANDS[command]
      // @ts-ignore
      if (this[methodName]) {
        // @ts-ignore
        this[methodName]();
      }
    }
  }

  public incrementByte() {
    this.memory[this.currentPointerPosition] += 1;
  }
  
  public decrementByte() {
    this.memory[this.currentPointerPosition] -= 1;
  }

  public writeByteToOutput() {
    this.bufferText += String.fromCharCode(this.memory[this.currentPointerPosition]);
  }

  public movePointerToRight() {
    this.currentPointerPosition += 1;
    if (this.currentPointerPosition > 50)  {
      this.handleOutOfIndexError()
    }
  }

  public movePointerToLeft() {
    this.currentPointerPosition -= 1;
    if (this.currentPointerPosition < 0) {
      this.handleOutOfIndexError()
    }
  }

  public jumpToNext() {
    if (this.memory[this.currentPointerPosition] === 0) {
      while(this.program[this.currentProgramPosition] !== ']') {
        this.currentProgramPosition+=1
      }
    }
  }

  public jumpToPrevious() {
    if (this.memory[this.currentPointerPosition] !== 0) {
      while(this.program[this.currentProgramPosition] !== '[') {
        this.currentProgramPosition-=1
      }
    }
  }

  public print () {
    return this.bufferText;
  }
}