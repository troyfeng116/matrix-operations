/* Class Fraction implements Fraction objects and methods. Fraction objects are represented with a numerator
 * and denominator, where numerator can be any int and denominator must be positive. */

public class Fraction {
	private int numerator;
	private int denominator;
	
	public Fraction(int n, int d) {
		if (d == 0) System.err.println("Divide by zero");
		numerator = n;
		if (d < 0) {
			denominator = -1*d;
			numerator *= -1;
		}
		else denominator = d;
	}
	
	public void printFrac() {
		if (this.isWhole()) System.out.print(getWhole() + " ");
		else System.out.print(numerator + "/" + denominator + " ");
	}
	
	public static Fraction toFraction(int i) {
		return new Fraction(i, 1);
	}
	
	public int getWhole() {
		return numerator/denominator;
	}

	public boolean isWhole() {
		return numerator % denominator == 0;
	}
	
	public int numerator() {
		return numerator;
	}
	
	public int denominator() {
		return denominator;
	}
	
	public static int gcd(int n1, int n2) {
		if (n1 == 0) return n2;
		if (n2 == 0) return n1;
		if (n1 == n2) return n1;
		return gcd(n2, n1 % n2);
	}
	
	public void simplify() {
		if (numerator == 0) denominator = 1;
		else {
			int gcd = gcd((Math.abs(numerator)), denominator);
			numerator /= gcd;
			denominator /= gcd;
		}
	}
	
	public Fraction multiply(Fraction f) {
		int newNumerator = this.numerator * f.numerator;
		int newDenominator = this.denominator * f.denominator;
		Fraction result = new Fraction(newNumerator, newDenominator);
		result.simplify();
		return result;
	}
	
	public Fraction add(Fraction f) {
		int newNumerator = this.numerator * f.denominator + f.numerator * this.denominator;
		int newDenominator = this.denominator * f.denominator;
		Fraction result = new Fraction(newNumerator, newDenominator);
		result.simplify();
		return result;
	}
	
	public Fraction divide(Fraction f) {
		if (f.numerator == 0) {
			System.out.println("Divide by zero");
			return null;
		}
		int newNumerator = this.numerator * f.denominator;
		int newDenominator = Math.abs(this.denominator * f.numerator);
		if (f.numerator < 0) newNumerator *= -1;
		return new Fraction(newNumerator, newDenominator);
	}
	
	public Fraction subtract(Fraction f) {
		int newNumerator = this.numerator * f.denominator - f.numerator * this.denominator;
		int newDenominator = this.denominator * f.denominator;
		Fraction result = new Fraction(newNumerator, newDenominator);
		result.simplify();
		return result;
	}
	
	public Fraction reciprocal() {
		int newNumerator = denominator;
		if (numerator < 0) newNumerator *= -1;
		int newDenominator = (int) Math.abs(numerator);
		return new Fraction(newNumerator, newDenominator);
	}
	
	
}
