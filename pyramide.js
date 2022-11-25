const PyramidSort = (Array) => {
  if (Array.length == 0) return [];
  let n = Array.length,
    i = Math.floor(n / 2),
    j,
    k,
    t;
  while (true) {
    if (i > 0) t = Array[--i];
    else {
      n--;
      if (n == 0) return Array;
      t = Array[n];
      Array[n] = Array[0];
    }
    j = i;
    k = j * 2 + 1;
    while (k < n) {
      if (k + 1 < n && Array[k + 1] > Array[k]) k++;
      if (Array[k] > t) {
        Array[j] = Array[k];
        j = k;
        k = j * 2 + 1;
      } else break;
    }
    Array[j] = t;
  }
};

function Pyramide(maxSize) {
  this.maxSize = maxSize;
  this.currentSize = 0;
  this.values = [];
  this.print = function () {
    return (() => {
      let pyramideValues = "";
      for (let i = 0; i < this.currentSize; i++) {
        pyramideValues = pyramideValues + this.values[i] + " ";
      }
      if (this.currentSize === 0) {
        console.log("Пирамида пока пустая");
      } else {
        console.log("Пирамида: " + pyramideValues);
      }
      let elPerRow = 1;
      check = true;
      let row = [];
      let fakeValues = [...this.values];
      while (check) {
        let el = fakeValues.shift();
        if (el == undefined) {
          check = false;
          while (row.length !== elPerRow) {
            row.push("");
          }
        } else {
          row.push(el);
        }
        if (row.length === elPerRow) {
          console.log(row);
          elPerRow *= 2;
          row = [];
        }
      }
    })();
  };

  this.addNewElement = function (element) {
    return (() => {
      if (this.currentSize !== this.maxSize) {
        this.values.push(element);
        this.dispUp(this.currentSize++);
      } else {
        console.log("место кончилось");
      }
    })();
  };

  this.dispUp = function (index) {
    return (() => {
      let parentIndex = Math.round((index - 1) / 2);
      let el = this.values[index];
      while (index > 0 && this.values[parentIndex] < el) {
        this.values[index] = this.values[parentIndex];
        index = parentIndex;
        parentIndex = Math.round((parentIndex - 1) / 2);
      }
      this.values[index] = el;
    })();
  };

  this.deleteElement = function (element) {
    return (() => {
      if (this.values.includes(element)) {
        index = this.values.indexOf(element);
        this.values[index] = this.values[--this.currentSize];
        this.values.pop();
        this.dispDown(index);
      } else {
        console.log("Такого элемента в пирамиде нет");
      }
    })();
  };
  this.dispDown = function (index) {
    return (() => {
      let maxChild;
      let indexEl = this.values[index];
      while (index < Math.round(this.currentSize / 2)) {
        let leftCh = 2 * index + 1;
        let rightCh = leftCh + 1;
        if (
          rightCh < this.currentSize &&
          this.values[leftCh] < this.values[rightCh]
        ) {
          maxChild = rightCh;
        } else {
          maxChild = leftCh;
        }
        if (indexEl >= this.values[maxChild]) {
          break;
        }
        this.values[index] = this.values[maxChild];
        index = maxChild;
      }
      this.values[index] = indexEl;
    })();
  };
  this.find = function (element) {
    return (() => {
      if (this.values.includes(element)) {
        console.log(
          "Элемент есть в пирамиде и имеет индекс: " +
            this.values.indexOf(element)
        );
      } else {
        console.log("Такого элемента нет в пирамиде");
      }
    })();
  };
}

const pyramide = new Pyramide(100);
pyramide.addNewElement(1);
pyramide.addNewElement(3);
pyramide.addNewElement(2);
pyramide.addNewElement(4);
pyramide.addNewElement(5);
pyramide.deleteElement(4);
pyramide.find(5);
pyramide.print();

console.log("Результат сортировки: " + PyramidSort([1, 6, 5, 2, 3]));
