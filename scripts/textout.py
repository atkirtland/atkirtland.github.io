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

env_tags = "(proof|definition|theorem|lemma|conjecture|corollary|example|question)"
replace_pattern = r"\\begin\{"+env_tags+r"\}(\[(.*)\])?"

with open(path, "r") as f:
    lines = f.readlines()
    base_contents = f.read()

    md_contents = ""
    md_contents += "---\n"
    md_contents += "layout: post\n"

    title = ""
    author = ""

    for line in lines:
        l = line
        
        p = re.compile(r"\\(title|author)\{(.*)\}")
        m = p.match(line)
        if m:
            if m.group(1) == "title":
                title = m.group(2)
                md_contents += "title: "+title+"\n"
            else:
                author = m.group(2)
                md_contents += "author: "+author+"\n"
            if title != "" and author != "":
                md_contents += "---"
            continue

        p = re.compile(r"% (tags|categories|category):(.*)")
        m = p.match(line)
        if m:
            md_contents += m.group(1)+": "+m.group(2)+"\n"
            continue

        p = re.compile(replace_pattern)
        m = p.match(line)
        if m:
            l = '<div class="'+m.group(1)+'"'
            if m.group(2):
                l += ' text="'+m.group(3)+'"'
            l += '>\n'
            md_contents += l
            continue

        l = re.sub(r"\\begin{itemize}|\\end{itemize}|\\usepackage.*|\\begin\{document\}|\\end\{document\}|\\titlepage.*|\\tableofcontents.*|\\documentclass.*|\\date.*", "", l)
        l = re.sub(r" *\\item ", "- ", l)
        l = re.sub(r"\\end{"+env_tags+r"}", "</div>", l)
        l = re.sub(r"\\section\{(.*)\}", r"# \1", l)
        l = re.sub(r"\\subsection\{(.*)\}", r"## \1", l)
        l = re.sub(r"(?:``)|(?:'')", '"', l)
        l = re.sub(r"\\url\{(.*)\}", r"<\1>", l)
        md_contents += l
    with open(postpath, "w") as f2:
        f2.write(md_contents)




    tex_contents = ""
    for line in lines:
        tex_contents += line
    with open(noext+"fake", "w") as f2:
        f2.write(tex_contents)
