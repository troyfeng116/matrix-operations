Matrix Operations
=================
Troy Feng ([email](https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRspgznCfqVPTvZlFBltnrVqhMNsWdjVQdXknVGnTXNPvvvcHFNBPPRckjhMPhkkvDnvrVB))
----------------

This collection of classes represents a variety of matrix operations, namely determinant, row reduced echelon form, matrix inverse, and (somewhat flimsy and not-at-all robust) eigenvalue computation. 

Since Gauss-Jordan elimination, determinant calculation, and inverse computation is quite procedural, the algorithms are rather straightforward to implement given a background in basic linear algebra and number theory. Coding them was, as always, a good way to reinforce understanding of these topics and procedures.

Eigenstuff is a much more interesting problem, as it opens up the world of computer algebra and numerical analysis. I am still in the process of researching and implementing efficient algorithms to calculate eigenvalues for rational entries; right now, I have implemented a clumsy and naive characteristic polynomial root-finding approach, which is highly subject to ill-conditioning but somewhat accurate for well-behaved rational entries.

Currently, Matrix objects can support integers and rational fractions (to an extent).

Ultimately, I hope to complete a front-end interface (either as a Java GUI applet or an HTML/CSS undertaking) to facilitate user input.