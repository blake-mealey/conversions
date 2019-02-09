export class Color {

  constructor(public r: number,
              public g: number,
              public b: number) {
  }

  public static fromCssString(data: string): Color {
    if (data.startsWith('rgb')) {
      data = data.substring(4, data.length - 1);
      let parts = data.split(',');
      return new Color(Number(parts[0].trim()), Number(parts[1].trim()), Number(parts[2].trim()));
    }
  }

  private lerpNumber(a: number, b: number, alpha: number) {
    return a + ((b - a) * alpha);
  }

  public lerp(to: Color, alpha: number): Color {
    return new Color(
      this.lerpNumber(this.r, to.r, alpha),
      this.lerpNumber(this.g, to.g, alpha),
      this.lerpNumber(this.b, to.b, alpha));
  }

  public multiply(factor: number): Color {
    return new Color(this.r * factor, this.g * factor, this.b * factor);
  }

  public add(other: Color): Color {
    return new Color(this.r + other.r, this.g + other.g, this.b + other.g);
  }

  public subtract(other: Color): Color {
    return new Color(this.r - other.r, this.g - other.g, this.b - other.b);
  }

  public lighten(amount: number): Color {
    return this.add(this.multiply(amount));
  }

  public darken(amount: number): Color {
    return this.subtract(this.multiply(amount));
  }

  public equals(other: Color): boolean {
    return this.r === other.r && this.g === other.g && this.b === other.b;
  }

  public toString(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`
  }
}
