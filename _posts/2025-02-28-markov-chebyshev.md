---
category: Math
tags: en
title: Simple Markov and Chebyshev Inequalities
last_modified_at: 2025-02-28
published: true
---


<p>
Let $X$ be a random variable. Using an indicator variable, we have $\Pr\sqbracks{\abs{X-c}\geq a}=\E\sqbracks{𝟙_{\abs{X-c}\geq a}}$ yes. We can recover various bounds/inequalities by considering different values of $c$ and functions $f(x)$ that dominate $𝟙_{|x-c|\geq a}$. By the monotonicity of the Lebesgue integral, we have that  $\E[𝟙_{|X-c|\geq a}]\leq \E[f(X)]$.
</p>

![](/assets/img/markov-cheby.png)

If $c=0$, $f(x)=x/a$, and $X$ is nonnegative, then we get Markov's inequality as

$$P[X\geq a]=\E[𝟙_{X\geq a}]\leq\E[X/a]=\E[X]/b$$

If $c=\E[X]$ and $f(x)=((x-\E[X])/a)^2$ (the quadratic that passes through $(\E[X]+a,1)$), then we get Chebyshev's inequality as

$$\Pr[\abs{X-\E[X]}\geq a]=\E[𝟙_{\abs{X-\E[X]}\geq a}]\leq\E[((X-\E[X])/a)^2]=\Var[X]/a^2$$

With $c=0$ and $f(x)=\phi(x)/\phi(a)$ for $\phi$ nondecreasing and $X$ nonnegative, we get extensions of Markov's inequality,

$$\Pr[X\geq a]\leq\E[\phi(X)]/\phi(a)$$

For example, with $\phi(x)=e^{tx}$, we get the Chernoff bound

$$\Pr[X\geq a]\leq M[t]e^{-ta}$$

where $M[t]$ is the moment generating function.

Sources
- [Muni Sreenivas Pydi (ముని శ్రీనివాస్ పైడి)'s answer to What is an intuitive explanation of Markov's inequality? - Quora](https://www.quora.com/What-is-an-intuitive-explanation-of-Markovs-inequality/answer/Muni-Sreenivas-Pydi)
- [probability - Visualizing Markov and Chebyshev inequalities - Mathematics Stack Exchange](https://math.stackexchange.com/questions/518873/visualizing-markov-and-chebyshev-inequalities) - alternative graphical proof of the Markov inequality
- [people.math.wisc.edu/\~roch/mdp/roch-mdp-chap2.pdf](https://people.math.wisc.edu/~roch/mdp/roch-mdp-chap2.pdf)
