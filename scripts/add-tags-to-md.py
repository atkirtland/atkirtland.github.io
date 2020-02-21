#!/usr/bin/env python3

import os.path
import sys
import re

path = sys.argv[1]
postpath = sys.argv[2]

with open(path, "r") as f:
    lines = f.readlines()

    md_contents = ""

    # level keeps track of which heading we want to be in
    pre_level = 0

    for line in lines:
        l = line
        words = l.split(" ")
        # assuming the only first words of a line that begin with # are those markdown tags
        if words[0][0] == "#" and len(words[0]) >= 2:
            post_level = len(words[0])

            # I just put these before the first section for simplicity int the code, but it should go after the jekyll header
            l = ""
            if pre_level == 0:
                l = "<!-- this file was generated from a file in /raw -->\n"
            if post_level <= pre_level:
                l = l + "\n </details>"
            if post_level < pre_level:
                l = l + "\n </details>"

            l = l + "<details>\n\n<summary><h"+str(post_level)+" style='display: inline'>"+" ".join(words[1:])+"</h"+str(post_level)+"></summary>\n"

            pre_level = post_level
        
        md_contents += l
    md_contents += "\n</details>"
    with open(postpath, "w") as f2:
        f2.write(md_contents)
