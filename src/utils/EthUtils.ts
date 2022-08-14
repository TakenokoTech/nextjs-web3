declare global {
  interface String {
    toShortAddress(): string;
  }
}

String.prototype.toShortAddress = function () {
  return this.slice(0, 6) + "..." + this.slice(-4);
};

export {};
