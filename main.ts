import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

class ListNode {
  value: number;
  next: ListNode | null;
  previous: ListNode | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

class DoublyLinkedList {
  head: ListNode | null;
  tail: ListNode | null;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  getSize(): number {
    return this.size;
  }

  pushBack(value: number) {
    const newNode = new ListNode(value);

    if (this.head === null || this.tail === null) {
      this.head = newNode;
      this.tail = this.head;
      this.size += 1;
    } else {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;
      this.size += 1;
    }
  }

  pushFront(value: number) {
    const newNode = new ListNode(value);

    if (this.head === null || this.tail === null) {
      this.head = newNode;
      this.tail = this.head;
      this.size += 1;
    } else {
      this.head.previous = newNode;
      newNode.next = this.head;
      this.head = newNode;
      this.size += 1;
    }
  }

  popBack(): number | null {
    if (this.head === null || this.tail === null) {
      return null;
    }

    const popValue = this.tail.value;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size -= 1;
      return popValue;
    } else {
      this.tail = this.tail.previous;
      this.tail!.next = null;
      this.size -= 1;
      return popValue;
    }
  }

  popFront(): number | null {
    if (this.head === null || this.tail === null) {
      return null;
    }

    const popValue = this.head.value;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size -= 1;
      return popValue;
    } else {
      this.head = this.head.next;
      this.head!.previous = null;
      this.size -= 1;
      return popValue;
    }
  }

  find(value: number): boolean {
    let current = this.head;

    while (current !== null) {
      if (current.value === value) {
        return true;
      } else {
        current = current.next;
      }
    }

    return false;
  }

  remove(value: number): number | null {
    let current = this.head;

    while (current !== null) {
      if (current.value === value && current === this.head) {
        this.popFront();
        return value;
      } else if (current.value === value && current === this.tail) {
        this.popBack();
        return value;
      } else if (current.value === value) {
        const beforeCurrent = current.previous;
        const afterCurrent = current.next;

        beforeCurrent!.next = current.next;
        afterCurrent!.previous = current.previous;

        current.next = null;
        current.previous = null;
        this.size -= 1;

        return current.value;
      } else {
        current = current.next;
      }
    }

    return null;
  }

  print(): number[] {
    const result: number[] = [];

    if (this.getSize() === 0) {
      return [];
    } else {
      let current = this.head;

      while (current) {
        result.push(current.value);
        current = current.next;
      }
    }

    return result;
  }
}

class Queue {
  private doublyLinkedList = new DoublyLinkedList();

  enqueue(value: number) {
    this.doublyLinkedList.pushBack(value);
  }

  dequeue(): number | null {
    return this.doublyLinkedList.popFront();
  }

  getSize(): number {
    return this.doublyLinkedList.getSize();
  }

  isEmpty(): boolean {
    if (this.getSize() === 0) {
      return true;
    } else {
      return false;
    }
  }

  peek(): number | null {
    if (this.isEmpty()) {
      return null;
    } else {
      return this.doublyLinkedList.head!.value;
    }
  }

  print(): number[] {
    return this.doublyLinkedList.print();
  }
}

function checkNumber(value: string | undefined): number | null {
  if (isNaN(Number(value))) {
    return null;
  } else if (value === "") {
    return null;
  } else {
    return Number(value);
  }
}

async function main() {
  const rl = readline.createInterface({ input, output });

  const doublyList = new DoublyLinkedList();
  const queue = new Queue();

  console.log("Введите help, чтобы увидеть список команд");

  while (true) {
    const request: string[] = (await rl.question("Введите команду: "))
      .trim()
      .toLowerCase()
      .split(" ");

    const value = checkNumber(request[1]);

    switch (request[0]) {
      case "listsize": {
        if (doublyList.getSize() === 0) {
          console.log("Список пуст");
        } else {
          console.log(`Длина списка: ${doublyList.getSize()}`);
        }
        break;
      }
      case "pushback": {
        if (value === null) {
          console.log("Некорректное значение");
        } else {
          doublyList.pushBack(value);
          console.log(`Добавлено в конец: ${value}`);
        }
        break;
      }
      case "pushfront": {
        if (value === null) {
          console.log("Некорректное значение");
        } else {
          doublyList.pushFront(value);
          console.log(`Добавлено в начало: ${value}`);
        }
        break;
      }
      case "popback": {
        if (doublyList.getSize() === 0) {
          console.log("Список пуст");
        } else {
          const popValue = doublyList.popBack();
          console.log(`Удалено из конца списка: ${popValue}`);
        }
        break;
      }
      case "popfront": {
        if (doublyList.getSize() === 0) {
          console.log("Список пуст");
        } else {
          const popValue = doublyList.popFront();
          console.log(`Удалено из начала списка: ${popValue}`);
        }
        break;
      }
      case "find": {
        if (value === null) {
          console.log("Некорректное значение");
        } else {
          if (doublyList.find(value)) {
            console.log(`Значение ${value} найдено`);
          } else {
            console.log(`Значение ${value} не найдено`);
          }
        }
        break;
      }
      case "remove": {
        if (value === null) {
          console.log("Некорректное значение");
        } else {
          const removeValue = doublyList.remove(value);
          if (removeValue === null) {
            console.log(`Значения ${value} нет в списке`);
          } else {
            console.log(`Значение ${removeValue} удалено из списка`);
          }
        }
        break;
      }
      case "listprint": {
        if (doublyList.getSize() === 0) {
          console.log("Список пуст");
        } else {
          console.log(`Список: ${doublyList.print()}`);
        }
        break;
      }
      case "enqueue": {
        if (value === null) {
          console.log("Некорректное значение");
        } else {
          queue.enqueue(value);
          console.log(`Добавлено в очередь: ${value}`);
        }
        break;
      }
      case "dequeue": {
        if (queue.isEmpty()) {
          console.log("Очередь пуста");
        } else {
          const dequeueValue = queue.dequeue();
          console.log(`Удалено из очереди: ${dequeueValue}`);
        }
        break;
      }
      case "queuesize": {
        if (queue.isEmpty()) {
          console.log("Очередь пуста");
        } else {
          console.log(`Длина очереди: ${queue.getSize()}`);
        }
        break;
      }
      case "isempty": {
        if (queue.isEmpty()) {
          console.log("Очередь пуста");
        } else {
          console.log("Очередь не пуста");
        }
        break;
      }
      case "peek": {
        if (queue.isEmpty()) {
          console.log("Очередь пуста");
        } else {
          const peekValue = queue.peek();
          console.log(`Первый в очереди: ${peekValue}`);
        }
        break;
      }
      case "queueprint": {
        if (queue.isEmpty()) {
          console.log("Очередь пуста");
        } else {
          console.log(`Очередь: ${queue.print()}`);
        }
        break;
      }
      case "help": {
        console.log(`
Список всех команд для Двусвязного списка и Очереди

=== Двусвязный список ===
Длина списка: listsize
Добавить в конец списка: pushback число
Добавить в начало списка: pushfront число
Удалить последний элемент списка: popback
Удалить первый элемент списка: popfront
Найти элемент в списке: find число
Удалить элемент из списка: remove число
Посмотреть список: listprint

=== Очередь ===
Добавить в очередь: enqueue число
Удалить из очереди: dequeue
Длина очереди: queuesize
Проверка на пустоту очереди: isempty
Первый элемент очереди: peek
Посмотреть очередь: queueprint

Выход: exit
Список команд: help
`);
        break;
      }
      case "exit": {
        console.log("Выход из программы");
        rl.close();
        return;
      }
      default: {
        console.log("Неизвестная команда");
        break;
      }
    }
  }
}

main();
