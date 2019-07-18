#!/usr/bin/env python3

# I ran into issues with potentially using Liquid to replace tex tags with the desired HTML tags, so I'm using Python instead
# this script should take a tex file without proper heading and build a pdf as well as a proper post file for Jekyll, so that I can write with support for both languages at once

import os.path
import sys
import re

path = sys.argv[1]
basename = os.path.basename(path)
noext = os.path.splitext(basename)[0]
mainpath = os.path.dirname(os.path.dirname(os.path.abspath(path)))
postpath = os.path.join(mainpath, "_posts", noext+".md")
with open(path, "r") as f:
    lines = f.readlines()
    base_contents = f.read()

    tex_contents = ""
    for line in lines:
        #tex_contents += re.sub(r"definition", r"love", line)
        tex_contents += re.sub(r"\\\begin\{definition\}", r"<div class=\"definition\">", line)
    with open(postpath, "w") as f2:
        f2.write(tex_contents)

    md_contents = ""
    


    print(postpath)
