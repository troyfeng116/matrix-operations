Matrix Operations
=================
Troy Feng ([troy.feng@yale.edu](mailto:troy.feng@yale.edu))
----------------

This project is split into two parts: a directory of Java classes, and a directory of HTML/CSS/JavaScript files.

The Java classes were written first, as I was curious to explore computational linear algebra. They represent a variety of matrix operations, namely determinant, row reduced echelon form, matrix inverse, and (somewhat less robust) eigenvalue computation. They also feature full auxiliary implementations of Fraction and Polynomial classes and several interesting algorithms (such as calculating the sign of a permutation and root-finding).

Since Gauss-Jordan elimination, determinant calculation, and inverse computation is quite procedural, the algorithms are rather straightforward to implement given a background in basic linear algebra and number theory. Coding them was, as always, a good way to reinforce understanding of these topics and procedures.

Eigenstuff is a much more interesting problem, as it opens up the world of computer algebra and numerical analysis. I am still in the process of researching and implementing efficient algorithms to calculate eigenvalues for rational entries; right now, I have implemented a clumsy and naive characteristic polynomial root-finding approach, which is highly subject to ill-conditioning but somewhat accurate for well-behaved rational entries.

Currently, my Java Matrix objects can support integers and rational fractions, but not floating-point (parting because of the issue of root-finding).

The HTML/CSS/JavaScript portion represents a front-end endeavor that is much easier to use than the clumsy tester class in the Java files. All pages are written in HTML, styled with CSS, and scripted using JavaScript. Features include responsive board size, robust input parsing, and fraction support. Matrix operation algorithms and functions are essentially translated from Java to JavaScript, but with some clever simplifications. 

Please find and feel free to use the finished tool here: (link will be provided soon)