Algorithm.CellularAutomata = function (startCells, ruleSet, maxGens) {
  this._cells = startCells;
  this._ruleSet = ruleSet;
  this._maxGens = maxGens;
}

Algorithm.CellularAutomata.prototype.generate = function (callback) {
  var gens = 0;
  while(gens != this._maxGens) {
    var newcells = new Array(this._cells.length);
    for(var i = 1; i < this._cells.length - 1; i++) {
      if(this._cells[i] == undefined) {
        this._cells[i] = 0;
      }
      newcells[i] = this.processOutcome(this._cells[i - 1], this._cells[i], this._cells[i + 1]);
    }
    this._cells = newcells;
    for(var i = 0; i < this._cells.length; i++) {
      callback(i, gens, this._cells[i]);
    }
    gens++;
  }
}

Algorithm.CellularAutomata.prototype.processOutcome = function (l, m, r) {
  var s = "" + l + m + r;
  var index = parseInt(s, 2);
  return this._ruleSet[(this._ruleSet.length - 1) - index];
}
