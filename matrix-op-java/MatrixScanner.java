/* Class to read stdin and test matrix utilities. */

import java.util.Scanner;

public class MatrixScanner {
	public static void main(String[] args) {
		Scanner s1 = new Scanner(System.in);
		
		/* Read nRows. */
		System.out.println("Enter nRows = height of matrix.");
		String nRowsInput = s1.nextLine();
		int nRows = 0;
		try {
			nRows = Integer.parseInt(nRowsInput);
		} catch (NumberFormatException e) {
			System.out.println("Invalid nRows");
			System.exit(0);
		} finally {
			if (nRows <= 0) {
				System.out.println("nRows must be positive integer");
				System.exit(0);
			}
		}
		System.out.println("You entered " + nRows);
		
		/* Read nCols. */
		System.out.println("Enter nCols = width of matrix.");
		String nColsInput = s1.nextLine();
		int nCols = 0;
		try {
			nCols = Integer.parseInt(nColsInput);
		} catch (NumberFormatException e) {
			System.out.println("Invalid nCols");
			System.exit(0);
		} finally {
			if (nCols <= 0) {
				System.out.println("nCols must be positive integer");
				System.exit(0);
			}
		}
		System.out.println("You entered " + nCols);
		
		/* Read matrix entries. */
		int[][] matrix = new int[nRows][nCols];
		for (int row = 0; row < nRows; row++) {
			System.out.println("Enter " + nCols + " integers in row " + row + " separated by spaces");
			String rowInput = s1.nextLine();
			String[] nums = rowInput.split(" ");
			int col = 0;
			for (String s: nums) {
				if (s.equals("")) continue;
				try {
					int entry = Integer.parseInt(s);
					matrix[row][col] = entry;
				} catch (NumberFormatException e) {
					System.out.println("Invalid row entry");
					System.exit(0);
				} catch (ArrayIndexOutOfBoundsException e) {
					System.out.println("Too many row entries");
					System.exit(0);
				}
				col++;
			}
			if (col != nCols) {
				System.out.println("Too few row entries");
				System.exit(0);
			}
		}
		
	// MATRIX TESTING.	
		Matrix mat = new Matrix(nRows, nCols, matrix);
		System.out.println("DETERMINANT: " + MatrixOperations.det2(mat));
		Matrix test = MatrixOperations.rref(mat);
		Matrix inverse = MatrixOperations.inverse(mat);
		System.out.println("RREF: ");
		test.printFracMatrix();
		System.out.println("INVERSE: ");
		inverse.printFracMatrix();
		
	// FRACTION TESTING.
		Fraction f1 = new Fraction(1,2);
		f1.printFrac();
		Fraction f2 = new Fraction(2,3);
		f2.printFrac();
		f1.add(f2).printFrac();
		
	// POLYNOMIAL TESTING.
		Polynomial p1 = new Polynomial(0, new int[]{1});
		Polynomial p2 = new Polynomial(2, new int[]{2, -14, 2});
		Polynomial p3 = p1.add(p2);
		Polynomial p4 = p2.multiply(p3);
		p1.printPolynomial();
		p2.printPolynomial();
		p3.printPolynomial();
		p4.printPolynomial();
		p4.multiply(p3).printPolynomial();
		p4.multiply(p3).derivative().printPolynomial();
		p4.derivative().printPolynomial();
		System.out.println("p2(2) = " + p2.plug(2.0));
		double root = p4.findRoot(1.0);
		double root2 = p4.findRoot(5.0);
		double root3 = p4.findRoot(-5.0);
		System.out.println(root);
		System.out.println(root2);
		System.out.println(root3);
		Polynomial p5 = new Polynomial(2, new int[] {0,0,1});
		Polynomial p6 = new Polynomial(3, new int[] {-40, -18, 103, 21});
		Polynomial p7 = p5.multiply(p6);
		double[] roots = p7.findAllRoots();
		for (double r: roots) System.out.println(r);
	
	// CHAR POLY TESTING.
		Polynomial charPoly = MatrixOperations.charPoly(mat);
		charPoly.printPolynomial();
		double[] roots2 = charPoly.findAllRoots();
		for (double r: roots2) System.out.println(r);
		
		s1.close();
	}
}
