/* Implements Polynomial objects and methods. */

public class Polynomial {
	
	private static final double EPSILON = 10E-6;
	int degree;
	int[] coefficients; /* Represents coefficients of polynomial, where coefficients[i] represents coefficient of x^i term.
	 					Contains degree+1 entries, e.g. a constant is represented by a 1-dimensional array. */
	
	public Polynomial(int d, int[] c) {
		if (c.length != d+1)
			System.err.println("Number of coefficients doesn't match degree");
		else {
			degree = d;
			coefficients = c;
		}
	}
	
	/* Prints this polynomial to System.out, formatted nicely. */
	public void printPolynomial() {
		/* Print constant. */
		if (degree == 0) System.out.println(coefficients[0]);
		/* Print binomial expression. */
		else if (degree == 1) {
			if (coefficients[0] < 0) {
				if (coefficients[1] == 1) System.out.println("x - " + -1*coefficients[0]);
				else if (coefficients[1] == -1) System.out.println("-x - " + -1*coefficients[0]);
				else System.out.println(coefficients[1] + "x - " + -1*coefficients[0]);
			}
			else {
				if (coefficients[1] == 1) System.out.println("x + " + coefficients[0]);
				else if (coefficients[1] == -1) System.out.println("-x + " + coefficients[0]);
				else System.out.println(coefficients[1] + "x + " + coefficients[0]);
			}
		}
		/* Print general polynomial. */
		else {
			/* Print first term. */
			if (coefficients[degree] == 1) System.out.print("x^" + degree);
			else if (coefficients[degree] == -1) System.out.print("-x^" + degree);
			else System.out.print(coefficients[degree] + "x^" + degree);
			
			/* Print all terms except x^1 and constant term. */
			for (int n = degree-1; n >= 2; n--) {
				if (coefficients[n] == 0) ;
				else if (coefficients[n] < 0) {
					if (coefficients[n] == -1) System.out.print(" - x^" + n);
					else System.out.print(" - " + -1*coefficients[n] + "x^" + n);
				}
				else {
					if (coefficients[n] == 1) System.out.print(" + x^" + n);
					else System.out.print(" + " + coefficients[n] + "x^" + n);
				}
			}
			
			/* Print linear term. */
			if (coefficients[1] < 0) {
				if (coefficients[1] == -1) System.out.print(" - x");
				else System.out.print(" - " + -1*coefficients[1] + "x");
			}
			else if (coefficients[1] > 0) {
				if (coefficients[1] == 1) System.out.print(" + x");
				else System.out.print(" + " + coefficients[1] + "x");
			}
			else ;
			
			/* Print constant. */
			if (coefficients[0] < 0) System.out.println(" - " + -1*coefficients[0]);
			else if (coefficients[0] > 0) System.out.println(" + " + coefficients[0]);
			else System.out.println();
		}
	}
	
	/* Return the result of plugging a double x into this polynomial. */
	public double plug(double x) {
		double result = 0.0;
		double xPow = 1.0;
		for (int n = 0; n <= degree; n++) {
			result += coefficients[n] * xPow;
			xPow *= x;
		}
		return result;
	}
	
	/* Return the polynomial resulting from adding this polynomial to another. */
	public Polynomial add(Polynomial p) {
		int[] coef2 = p.coefficients;
		int newDegree = degree > p.degree ? degree : p.degree;
		int[] newCoef = new int[newDegree + 1];
		int i = 0;
		while (i <= Math.min(degree, p.degree)) {
			newCoef[i] += coefficients[i] + coef2[i];
			i++;
		}
		while (i <= degree) {
			newCoef[i] += coefficients[i];
			i++;
		}
		while (i <= p.degree) {
			newCoef[i] += coef2[i];
			i++;
		}
		return new Polynomial(newDegree, newCoef);
	}
	
	/* Return the polynomial resulting from subtracting p from this polynomial. */
	public Polynomial subtract(Polynomial p) {
		Polynomial toSubtract = p.multiply(new Polynomial(0, new int[] {-1}));
		return this.add(toSubtract);
	}
	
	/* Return the polynomial resulting from multiplying this polynomial with another. */
	public Polynomial multiply(Polynomial p) {
		int newDegree = degree + p.degree;
		int[] newCoef = new int[newDegree + 1];
		/* FOIL. */
		for (int i = 0; i <= degree; i++) {
			for (int j = 0; j <= p.degree; j++) {
				newCoef[i+j] += coefficients[i] * p.coefficients[j];
			}
		}
		return new Polynomial(newDegree, newCoef);
	}
	
	/* Return derivative of this polynomial. */
	public Polynomial derivative() {
		/* Derivative of constant is zero. */
		if (degree == 0) return new Polynomial(0, new int[]{0});
		/* Else, use power rule on all terms. */
		int newDegree = degree - 1;
		int[] newCoef = new int[newDegree + 1];
		for (int n = 1; n <= degree; n++) {
			newCoef[n-1] += n * coefficients[n];
		}
		return new Polynomial(newDegree, newCoef);
	}
	
	
/* -------- ROOT-FINDING -------- */
	
	/* Return a real root of polynomial using Newton's method from initial guess point. Computes to accuracy EPSILON. */
	public double findRoot(double guess) {
		double value = plug(guess);
		if (Math.abs(value) < EPSILON) return guess;
		Polynomial derivative = this.derivative();
		double slope = derivative.plug(guess);
		if (Math.abs(slope) < EPSILON) {
			System.out.println("Unfortunate guess led to non-convergent Newton iteration (derivative zero)");
			return 0.0;
		}
		double newGuess = guess - value/slope;
		return findRoot(newGuess);
	}
	
	public static boolean withinRange(double[] roots, Polynomial p) {
		for (double r: roots) {
			if (Math.abs(p.plug(r)) > EPSILON) return false;
		}
		return true;
	}
	
	/* This root-finding algorithm uses Cauchy's polynomial root upper bound, and then applies Aberth-Ehrlich algorithm
	 * to n random initial approximations. */
	public double[] findAllRoots() {
		/* Find and store largest magnitude coefficient, not including c_n coefficient. */
		double maxCoef = Double.MIN_VALUE;
		for (int i = 0; i < degree; i++) {
			double c = coefficients[i];
			if (Double.compare(Math.abs(c), maxCoef) >= 0) {
				maxCoef = Math.abs(c);
			}
		}
		/* Set bound on roots using Cauchy bound, and create initial random distribution of root guesses. */
		double bound = 1 + Math.abs(maxCoef/coefficients[degree]);
		double[] guesses = new double[degree];
		for (int i = 0; i < degree; i++) {
			guesses[i] = Math.random() * bound * 2 - bound;
		}
		//System.out.println("Bound: " + bound);
		/* For each root guess, iterate using Aberth-Ehrlich method. */
		Polynomial derivative = derivative();
		while (!withinRange(guesses, this)) {
			for (int i = 0; i < degree; i++) {
				double guess = guesses[i];
				if (Math.abs(plug(guess)) <= EPSILON) ;
				else {
					double x = plug(guess) / derivative.plug(guess);
					double y = 0.0;
					for (int j = 0; j < degree; j++) {
						if (j == i) ;
						else y += 1/(guess - guesses[j]);
					}
					guesses[i] = guess - x / (1 - x * y);
				}
			}
		}
		return guesses;
	}
	

}
