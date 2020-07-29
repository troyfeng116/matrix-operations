/* Matrix implements Matrix objects and methods. Supports fractions and integers, albeit somewhat clumsily... */

public class Matrix {
	
	private int nRows;
	private int nCols;
	private int[][] entries;
	private Fraction[][] fracEntries;

	/* Construct a Matrix object representing the n-dimensional square identity matrix. */
	public Matrix(int n) {
		nRows = nCols = n;
		int[][] entries = new int[n][n];
		for (int i = 0; i < n; i++)
			entries[i][i] = 1;
		this.entries = entries;
		Fraction[][] fracEntries = new Fraction[n][n];
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++)
				fracEntries[i][j] = new Fraction(entries[i][j], 1);
		}
		this.fracEntries = fracEntries;
	}
	
	/* Construct a matrix object with given nRows, nCols, and entries. */
	public Matrix(int nRows, int nCols, int[][] entries) {
		if (nRows != entries.length || nCols != entries[0].length)
			System.err.println("Invalid nRows or nCols: doesn't match entries");
		this.nRows = nRows;
		this.nCols = nCols;
		this.entries = entries;
		Fraction[][] fEntries = new Fraction[nRows][nCols];
		for (int i = 0; i < nRows; i++) {
			for (int j = 0; j < nCols; j++)
				fEntries[i][j] = new Fraction(entries[i][j], 1);
		}
		fracEntries = fEntries;
	}
	
	/* A constructor option for Matrix objects that support fractions. */
	public Matrix(int nRows, int nCols, Fraction[][] fracEntries) {
		if (nRows != entries.length || nCols != entries[0].length)
			System.err.println("Invalid nRows or nCols: doesn't match entries");
		this.nRows = nRows;
		this.nCols = nCols;
		this.fracEntries = fracEntries;
	}

	
	public int[][] getAllEntries() {
		return entries;
	}
	
	public int nRows() {
		return nRows;
	}
	
	public int nCols() {
		return nCols;
	}
	
	/* Return entries of matrix in double form. */
	public double[][] getDoubleEntries() {
		double[][] result = new double[nRows][nCols];
		for (int i = 0; i < nRows; i++) {
			for (int j = 0; j < nCols; j++) {
				result[i][j] = (double) entries[i][j];
			}
		}
		return result;
	}
	
	/* Return entries of matrix in fractional form. */
	public Fraction[][] getFracEntries() {
		Fraction[][] result = new Fraction[nRows][nCols];
		for (int i = 0; i < nRows; i++) {
			for (int j = 0; j < nCols; j++) {
				result[i][j] = Fraction.toFraction(entries[i][j]);
			}
		}
		return result;
	}
	
	/* Convert an int matrix to Fraction. */
	public Matrix toFrac() {
		Fraction[][] newEntries = new Fraction[nRows][nCols];
		for (int i = 0; i < nRows; i++) {
			for (int j = 0; j < nCols; j++) {
				newEntries[i][j] = Fraction.toFraction(entries[i][j]);
			}
		}
		return new Matrix(nRows, nCols, newEntries);
	}
	
	/* Return i'th row of Matrix, zero-based. */
	public int[] row(int i) {
		try {
			return entries[i];
		} catch (ArrayIndexOutOfBoundsException e) {
			System.out.println("Invalid row");
			return new int[0];
		}
	}
	
	/* Return j'th column of Matrix, zero-based. */
	public int[] col(int j) {
		int[] result = new int[nCols];
		for (int i = 0; i < nCols; i++)
			result[i] = entries[i][j];
		return result;
	}
	
	/* Return the (i,j)th element of matrix, zero-based. */
	public int element(int i, int j) {
		try {
			return entries[i][j];
		} catch (ArrayIndexOutOfBoundsException e) {
			System.out.println("Invalid row");
			return 0;
		} 
	}
	
	/* subMat returns a Matrix that is identical to parent matrix m, except with the i'th row and
	 * j'th column omitted. To be used in some recursive matrix operations. */
	public Matrix subMat(int i, int j) {
		int[][] newElements = new int[nRows-1][nCols-1];
		for (int k = 0, p = 0; k < nRows; k++) {
			/* Skip row i. */
			if (k == i) ;
			else {
				for (int l = 0, q = 0; l < nCols; l++) {
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
		Matrix result = new Matrix(nRows-1, nCols -1, newElements);
		return result;
	}
	
	/* Prints integer entries of matrix, entries space-separated. */
	public void printMatrix() {
		for (int i = 0; i < nRows; i++) {
			for (int j = 0; j < nCols; j++)
				System.out.print(entries[i][j] + " ");
			System.out.println();
		}
	}
	
	/* Prints fractional entries of matrix, entries space-separated. */
	public void printFracMatrix() {
		for (int i = 0; i < nRows; i++) {
			for (int j = 0; j < nCols; j++) {
				fracEntries[i][j].printFrac();
				System.out.print(" ");
			}
			System.out.println();
		}
	}
	
}
