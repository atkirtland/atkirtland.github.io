---
categories: Math
title: Word Game（文字遊戲）Locks Puzzle Analysis
tags: en
---

I've been playing [Word Game/文字遊戲](https://store.steampowered.com/app/1109570/\_/) recently, and I ran into a puzzle that made me ask some questions about generators of the symmetric group $$S_7$$!

<style>
table {
  table-layout: fixed ;
  width: 100% ;
}
img {
  width: 75%;
  text-align: center;
  align: center;
}
</style>

<!--
| | |
| :---: | :---: |
| ![](/assets/img/wg-puzzle1-start.jpg) | ![](/assets/img/wg-puzzle1-end.jpg) |
| Start | End |
-->

<p align="center">
<img src="/assets/img/wg-puzzle1-start.jpg" width=500>
</p>

<p style="text-align: center;">Start</p>

<p align="center">
<img src="/assets/img/wg-puzzle1-end.jpg" width=500>
</p>

<p style="text-align: center;">End</p>

You have to press the 轉 characters to rotate the four characters surrounding 鎖 above it.
The first one is easy, but for the latter two it was slightly difficult for me to play around and get the right answer!
I thought a bit more about the math after I solved it, and we can view the left and right rotations as cycles $$(1,3,6,4)$$ and $$(2,4,7,5)$$ in $$S_7$$, where we number the positions from top to bottom and left to right in order 1 through 7, i.e. 可 starts in position 1, 封 starts in position 2, and 連 starts in position 7.

The first question to ask is if these two elements generate $$S_7$$, and the answer is yes!
Code is below in Julia.
Next, we can ask what the minimum word length is to reach any of the $$7!=5040$$ permutations using just these two generators, and the answer is 20.
I was curious because God's number for the Rubik's cube is 20, and I wasn't sure how to intuitively estimate minimum word lengths from the number of available generators and number of group elements.
If we added inverses (which aren't in the video game), we find we could reach any permutation in just 14 moves.

Also, if we notice that the characters in positions 3 and 6 are both 的, then we actually find that only 16 moves are required without inverses and just 12 with inverses!

Lastly, when I was working on the puzzle, I ran into a couple situations (when I had a wrong solution in mind that I was aiming at) where only two characters were swapped.
I checked how hard this was to do, and it turns out that most swaps in the game require 13 moves with the most requiring 17 moves when not considering the two equal characters.
Taking this into account still yields a mode of 13, a high of 14, and several lower numbers.
No wonder I had trouble swapping them!

It's clear that this puzzle could have been much, much harder if the designers willed it!
The actual solution was quite straightforward as the characters were aligned to make one think of the right answer and the number of moves required was fairly small.

<script src="https://gist.github.com/atkirtland/75f17e83e8deed1446d2e0b08932e1b4.js"></script>

