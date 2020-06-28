/* Class MatrixOperations supports various matrix operations, including determinant, inverse, eigenstuff,
 * matrix multiplication, and row reduction. */

import java.util.Arrays;

public class MatrixOperations {
	
/* -------- DETERMINANT STUFF -------- */
	
	/* mergeAndCount returns the number of inversions while merging two sorted array halves. Indices l through
	 * m are the L array, and m+1 through r are the R sub-array. Helper function for sign2. */
	private static int mergeAndCount(int[] permutation, int l, int m, int r) {
		int lenL = m - l + 1;
		int[] lCopy = Arrays.copyOfRange(permutation, l, m+1);
		/*for (int i = 0; i < lenL; i++)
			lCopy[i] = permutation[l + i];*/
		
		int lenR = r - m;
		int[] rCopy = Arrays.copyOfRange(permutation, m+1, r+1);
		/*for (int i = 0; i < lenR; i++)
			rCopy[i] = permutation[m + 1 + i];*/
		
		/* Merge the sorted L and R sub-arrays, counting inversions. */
		int lIndex = 0, rIndex = 0;
		int pIndex = l;
		int numInversions = 0;
		while (lIndex < lenL && rIndex < lenR) {
			if (lCopy[lIndex] < rCopy[rIndex]) {
				permutation[pIndex] = lCopy[lIndex];
				lIndex++;
			}
			else {
				/* Recall the L and R sub-arrays are sorted. So if any element in the L sub-array is greater
				 * than an element in the R sub-array, all other elements remaining in the L sub-array that
				 * haven't been merged yet MUST also be greater than that element in the R sub-array. */
				numInversions += m - (l+lIndex) + 1;
				permutation[pIndex] = rCopy[rIndex];
				rIndex++;
			}
			pIndex++;
		}
		
		/* Copy remaining elements in L and R sub-arrays to permutation. */
		while (lIndex < lenL) {
			permutation[pIndex] = lCopy[lIndex];
			lIndex++;
			pIndex++;
		}
		while (rIndex < lenR) {
			permutation[pIndex] = rCopy[rIndex];
			rIndex++;
			pIndex++;
		}
		return numInversions;
	}

	/* mSortInversions sorts array permutation in O(n log n) time as in merge sort, and additionally returns the
	 * number of inversions in permutation. */
	public static int mSortInversions(int[] permutation, int l, int r) {
		/* Base case. */
		if (l >= r) return 0;
		/* Recursive step. */
		else {
			int result = 0;
			int m = (r+l)/2;
			result += mSortInversions(permutation, l, m);
			result += mSortInversions(permutation, m+1, r);
			result += mergeAndCount(permutation, l, m, r);
			return result;
		}
	}
	
	/* sign1 and sign2 both return the sign of a permutation of the n integers from 1 through n,
	 * inclusive. sign1 uses a divide-and-conquer algorithm that extends mergeSort. sign2 uses the
	 * algebraic definition of sgn(permutation). Note sign2 must take input of the n integers from
	 * 1 through n, while sign1 works for any permutation of any n integers. */
	public static int sign1(int[] permutation) {
		int[] copy = Arrays.copyOf(permutation, permutation.length);
		int numInversions = mSortInversions(copy, 0, permutation.length - 1);
		return numInversions%2==1 ? -1 : 1;
	}
	
	/* If permutation contains only 1-n, PROD_{1<=i<j<=n} (p[i]-p[j])/(i-j) yields the number of
	 * inversions.  */
	public static int sign2(int[] permutation) {
		double product = 1.0;
		int len = permutation.length;
		for (int i = 0; i < len; i++) {
			for (int j = i+1; j < len; j++) {
				double x = (permutation[i] - permutation[j]) / ((double) i - j);
				product *= x;
			}
		}
		return (int) product;
	}
	
	/* Returns n!. */
	public static int factorial(int n) {
		if (n == 1) return 1;
		else return n * factorial(n-1);
	}
	
	/* Given a permutation of p, returns the next lexicographical permutation of the elements
	 * of p. Similar to next largest integer with same digits problem. */
	public static boolean generateAllPerms(int[] p) {
		int n = p.length;
		int k = n-2;
		while (k >= 0 && p[k] > p[k+1]) k--;
		if (k < 0) return false;
		int l = n-1;
		while (p[l] < p[k]) l--;
		int temp = p[k];
		p[k] = p[l];
		p[l] = temp;
		for (int i = k+1; i <= (k+n)/2; i++) {
			temp = p[i];
			p[i] = p[n-i+k];
			p[n-i+k] = temp;
		}
		return true;
	}
	
	/* Generates all permutations of n integers from 0 to n-1 using Heap's algorithm. */
	public static int[][] generatePerms2(int n) {
		return new int[0][0];
	}
	
	/* det1 calculates determinant of matrix using explicit Leibniz or Laplace formula. */
	public static int det1(Matrix m) {
		int dim = m.nCols();
		if (dim != m.nRows()) {
			System.err.println("Matrix must be square to calculate determinant");
			return 0;
		}
		int sum = 0;
		int[] permutation = new int[dim];
		for (int i = 0; i < permutation.length; i++) {
			permutation[i] = i;
		}
		int prod = 1;
		for (int j = 0; j < dim; j++) {
			prod *= m.element(j, permutation[j]);
		}
		sum += sign1(permutation) * prod;
		while (generatePerm(permutation)) {
			prod = 1;
			for (int j = 0; j < dim; j++) {
				prod *= m.element(j, permutation[j]);
			}
			sum += sign1(permutation) * prod;
		}
		return sum;
	}
	
	/* det2 calculates determinant of matrix using recursive form of Leibniz/Laplace. */
	public static int det2(Matrix m) {
		int dim = m.nCols();
		if (dim != m.nRows()) {
			System.err.println("Matrix must be square to calculate determinant");
			return 0;
		}
		if (dim == 1) return m.element(0,0);
		int sum = 0;
		for (int i = 0; i < dim; i++) {
			int mult = m.row(0)[i];
			if (i % 2 == 0)
				sum += mult * det2(m.subMat(0,i));
			else sum -= mult * det2(m.subMat(0,i));
		}
		return sum;
	}

	
/* -------- RREF and relevant row operations, etc. -------- */

	/* All calculations done in Fractions. */
	
	/* swapRows swaps the i'th and j'th rows of an array of fractions representing the entries of a matrix. */
	public static void swapRows(Fraction[][] entries, int i, int j) {
		Fraction[] temp = entries[j];
		entries[j] = entries[i];
		entries[i] = temp;
	}
	
	/* addRows adds some specified factor of the j'th row to the i'th row. */
	public static void addRow(Fraction[][] entries, int i, Fraction c, int j) {
		for (int k = 0; k < entries[0].length; k++) {
			entries[i][k] = entries[i][k].add(c.multiply(entries[j][k]));
		}
	}
	
	/* Used to display each step in rref. */
	private static void printFracArray(Fraction[][] f) {
		for (int i = 0; i < f.length; i++) {
			for (int j = 0; j < f[0].length; j++) {
				f[i][j].printFrac();
				System.out.print(" ");
			}
			System.out.println();
		}
	}
	
	/* Returns the rref form of matrix. Uses algorithm in rrefAux. */
	public static Matrix rref(Matrix m) {
		Fraction[][] newEntries = m.getFracEntries();
		rrefAux(newEntries, 0, 0);
		return new Matrix(m.nRows(), m.nCols(), newEntries);
	}
	
	/* rrefAux returns the row-reduced echelon form of the input matrix entries. All operations are done in fractional mode. */
	/* This approach builds pivots column by column. */
	public static void rrefAux(Fraction[][] entries, int currentCol, int currentRow) {
		System.out.println("CURRENTLY CREATING PIVOT IN COLUMN: " + currentCol);
		System.out.println("Entries is right now: ");
		printFracArray(entries);
		int nCols = entries[0].length;
		int nRows = entries.length;
		/* Base case. */
		if (currentCol == nCols) ;
		/* Recursion. */
		else {
			/* Move all rows with zero in current column to bottom of entries. First traversal places non-zero rows at top,
			 * second traversal places zero rows at bottom.*/
			Fraction[][] temp = entries.clone();
			int nonZeroRows = 0;
			int count = currentRow;
			for (int row = currentRow; row < nRows; row++) {
				if (entries[row][currentCol].numerator() != 0) {
					temp[count] = entries[row];
					System.out.println("pushed row " + row + " to temp row " + count);
					nonZeroRows++;
					count++;
				}
			}
			/* If there are no non-zero entries in current column, look for pivot in next column. */
			if (nonZeroRows == 0) 
				rrefAux(entries, currentCol + 1, currentRow);
			else {
				/* Finish moving zero-started rows to the bottom of temp. */
				for (int row = currentRow; row < nRows; row++) {
					if (entries[row][currentCol].numerator() == 0) {
						temp[count] = entries[row];
						System.out.println("pushed row " + row + " to temp row " + count);
						count++;
					}
				}
				System.out.println("After moving zero rows: ");
				printFracArray(temp);
				/* For each non-zero row in current column, make the entry in current column zero by adding factors of the
				 * current non-completed row. */
				for (int row = 0; row < nRows; row++) {
					if (row == currentRow) ;
					else if (temp[row][currentCol].numerator() != 0) {
						Fraction c = temp[row][currentCol].divide(temp[currentRow][currentCol]).multiply(new Fraction(-1, 1));
						addRow(temp, row, c, currentRow);
						System.out.print("added ");
						c.printFrac();
						System.out.println(" times row " + currentRow + " from temp row " + row);
					}
				}
				System.out.println("After adding row operation: ");
				printFracArray(temp);
				/* Multiply current row by reciprocal of pivot. */
				Fraction reciprocal = temp[currentRow][currentCol].reciprocal();
				for (int j = 0; j < nCols; j++) {
					temp[currentRow][j] = reciprocal.multiply(temp[currentRow][j]);
				}
				System.out.println("After scaling row: ");
				printFracArray(temp);
				/* Recurse. */
				for (int i = 0; i < nRows; i++)
					entries[i] = temp[i];
				rrefAux(entries, currentCol + 1, currentRow + 1);
			}			
		}
	}
	
	
/* -------- INVERSE (using Gauss-Jordan elimination or rref above). -------- */

	/* Calculate the inverse of a matrix using Gauss-Jordan elimination. */
	public static Matrix inverse(Matrix m) {
		if (m.nRows() != m.nCols()) {
			System.err.println("Matrix must be square");
			return null;
		}
		if (det2(m) == 0) {
			System.err.println("Matrix is not invertible");
			return null;
		}
		int dim = m.nRows();
		Fraction[][] augmented = new Fraction[dim][2 * dim];
		for (int row = 0; row < dim; row++) {
			for (int col = 0; col < dim; col++)
				augmented[row][col] = m.getFracEntries()[row][col];
		}
		for (int row = 0; row < dim; row++) {
			for (int col = dim; col < 2 * dim; col++) {
				if (col == row + dim) augmented[row][col] = new Fraction(1,1);
				else augmented[row][col] = new Fraction(0,1);
			}
		}
		
		rrefAux(augmented, 0, 0);
		Fraction[][] newEntries = new Fraction[dim][dim];
		for (int i = 0; i < dim; i++) {
			for (int j = 0; j < dim; j++)
				newEntries[i][j] = augmented[i][j+dim];
		}
		return new Matrix(dim, dim, newEntries);
	}
	
	
/* -------- EIGENSTUFF. -------- */
	
	/* Naive eigenvalue calculation method using characteristic polynomial. */
	
	/* Return characteristic polynomial. Calls charPolyAux, which is the same algorithm as the recursive
	 * determinant function above but modified for Polynomial objects. */
	public static Polynomial charPoly(Matrix m) {
		int[][] entries = m.getAllEntries();
		Polynomial[][] polyEntries = new Polynomial[m.nRows()][m.nCols()];
		for (int i = 0; i < m.nRows(); i++) {
			for (int j = 0; j < m.nCols(); j++) {
				if (i == j) polyEntries[i][j] = new Polynomial(1, new int[] {entries[i][j], -1});
				else polyEntries[i][j] = new Polynomial(0, new int[] {entries[i][j]});
			}
		}
		return charPolyAux(polyEntries);
	}
	
	/* Same as determinant method above, but tailored to Polynomial objects. */
	public static Polynomial charPolyAux(Polynomial[][] entries) {
		int degree = entries.length;
		if (entries[0].length != degree) {
			System.out.println("Matrix must be square");
			return null;
		}
		if (degree == 1) {
			return entries[0][0];
		}
		/*else if (dim == 2)
			return m.element(0, 0) * m.element(1, 1) - m.element(1, 0) * m.element(0, 1);*/
		else {
			Polynomial sum = new Polynomial(0, new int[] {0});
			for (int i = 0; i < degree; i++) {
				Polynomial mult = entries[0][i];
				if (i % 2 == 0)
					sum = sum.add(mult.multiply(charPolyAux(subArray(entries,0,i))));
				else sum = sum.subtract(mult.multiply(charPolyAux(subArray(entries,0,i))));
			}
			return sum;
		}
	}
	
	/* Similar to subMat used in det2, but returns sub-array of polynomial array. */
	public static Polynomial[][] subArray(Polynomial[][] entries, int i, int j) {
		int n = entries.length;
		Polynomial[][] newElements = new Polynomial[n-1][n-1];
		for (int k = 0, p = 0; k < n; k++) {
			/* Skip row i. */
			if (k == i) ;
			else {
				for (int l = 0, q = 0; l < n; l++) {
					/* Skip column j. */
					if (l == j) ;
					else {
						newElements[p][q] = entries[k][l];
						q++;
					}
				}
				p++;
			}
		}
		return newElements;
	}
	
	
}
