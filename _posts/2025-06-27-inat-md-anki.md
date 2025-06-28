---
category: 
tags: en
title: Using iNaturalist, Obsidian, and Anki to learn plant taxonomy
last_modified_at: 2025-06-27
published: true
---

# Using iNaturalist, Obsidian, and Anki to learn plant taxonomy

<p align="center" markdown=1>
  ![Obsidian graph of taxonomy notes](/assets/img/treeoflife.png)
  
  My Obsidian taxonomy notes [^1].
</p>

[^1]: A more powerful graph renderer would show this as a tree with only a couple of exceptions. Maybe I'll render it dynamically here in the future?

I wanted to share a workflow that other people might also find useful for learning taxonomy with Obsidian and Anki. I have had a very casual interest in learning the names of local native plants for years, and I found a pretty straightforward way I wanted to document here. 


## Step 1: Find a species of interest & learn about it

If you want to start from your local neighborhood, the first step is finding plants nearby you, uploading them to [iNaturalist](https://www.inaturalist.org/), and getting confirmation of their identity by local enthusiasts. After doing this, ideally read about the species on Wikipedia to have more semantic memory of it, and keep the Wikipedia page open for adding a note about it to your vault.

## Step 2: Add an Obsidian note for the species

I use Obsidian to keep track of the notes in my vault, but the important part that enables this workflow to work is just having a local note for each taxon. 

### Note structure

In my vault, I have a directory called `life/`, in which all files are Markdown notes of some taxonomic level. Files are named in the format `{Rank} {Name}.md`, e.g. `life/Kingdom Animalia.md`.  I keep nodes for anything Kingdom level and above (so Domain, a few Clades, and some Unranked levels) in this directory. Within `life/`, I have a subdirectory for each kingdom-level taxonomic group, named like `life/animalia/`. This is because taxonomic names are unique at the kingdom level, but [not above that](https://species.wikimedia.org/wiki/List_of_valid_homonyms). I store nodes for anything below the Kingdom level within its corresponding Kingdom subdirectory, and the I have nodes that fill in to make something almost a tree (see Step 3 below).

Within the Markdown file for a taxon, I link to subtaxa with a YAML `child` node. For example, here is my `Genus Monotropa.md` note:

```
---
aliases:
  - 水晶蘭屬
child:
  - "[[life/plantae/Species Monotropa uniflora|Species Monotropa uniflora]]"
  - "[[life/plantae/Species Monotropa hypopitys|Species Monotropa hypopitys]]"
role: "[[wiki/mycoheterotroph|mycoheterotroph]]"
etymology: "Greek monos, 'single,' and tropos, 'a turn' or trope, 'a turning,'"
created: 2024-08-25T22:18:57-04:00
modified: 2025-01-03T06:40:54-05:00
---
```

I only include additional information outside the YAML sometimes. I have `child` registered to form a hierarchy with the Obsidian Breadcrumbs plugin, which lets me conveniently view the tree without having to render it with an outside script.

Leaf nodes that I intend to make into cards have `image` YAML fields that I use to identify them in my script mentioned below in Step 3. For example, here's the note for `Species Monotropa uniflora.md`:

```
---
aliases: 水晶蘭, ghost pipe
child:
image: "[[external/ALL_PHOTOS/2024/08/20240824_141830.jpg]]"
tags: inat, anki
---

[[life/fungi/Family Russulaceae|Family Russulaceae]]
```

I previously used the tags to also identify which Markdown notes I wanted to make into Anki notes, but now I just use the image blanks.

### Adding notes / building the tree

To find information about the taxon levels, I use a mix of Wikipedia, then Wikispecies, and, if necessary, outside resources. This is usually pretty simple, and I've thought about writing a script to directly pull the info from Wikimedia to add the notes. For maybe 5% of notes, though, there is some discrepancy that makes this a bit harder.

- Sometimes Wikipedia is missing taxonomic levels like "Tribe" or "Subfamily" that other species in the same genus (or higher taxon) have listed. Wikispecies almost always has them though.
- Sometimes Wikipedia in different languages lists different scientific taxon names [^2], usually because one language still lists an archaic name. Wikispecies is often updated with the more recent version, or internet searches reveal the right choice.
- Sometimes the tree needs to be refactored to show more info. It's useful in the beginning to only include the bare minimum detail. For me, this was the DKPCOFGS classification, more or less. However, later I learned that some subfamilies have important characteristics [^3], and I refactored the tree to sort genera into their subfamilies. Also, many groups of animals that we commonly refer to match other taxon ranks. 

For these reasons, I haven't written the script yet, but it wouldn't be hard to do.

[^2]: I try to get taxon names in both English and Chinese
[^3]: Also, some subfamilies were originally their own families. Elpel, the text mentioned below in Step 5, still lists the old names in some cases, and I wanted to include the characteristics he mentions in the subfamily notes.

## Step 3: Convert the Markdown notes to a CSV with a script

I have the script in this gist in the vault directory `scripts/` , and I run it from the root. The script first tries to build an "pseudo-tree" from the note structure. I call it a pseudo-tree because there are some hybrids like Graptosedum 'Francesco Baldi' that are hybrids of plants in two different genera. Besides these exceptions, to make it a tree, I also added nodes for `Unranked Life`, `Unranked Virus`, and `Unranked Replicators` to allow viruses to be part of the tree as well since that made the code simpler 😬

The code does a few checks like that there are no orphan nodes not part of the pseudo-tree as well. I run the script whenever I've added enough new notes that I want Anki cards for them. The script produces a CSV containing the taxon's scientific name, common names, image, rank, genus, and family. The family blank actually also includes subfamily, tribe, etc in it, but I would separate these out if I wanted to drill them individually; in reviewing, I grade myself on knowing the family name.

Script:
<div style="height: 300px; overflow: auto;">
  <script src="https://gist.github.com/atkirtland/aa1a9ce8786065c4280018b4cc043e9c.js"></script>
</div>

I use an external script here rather than a plugin like `Obsidian_to_Anki` for two reasons. First, I wanted to get images linked in the YAML into the generated Anki cards, and this didn't seem possible with the plugin. Second, an external script can get ancestral information about the cards, such as the family name.

## Step 4: Import the CSV into Anki and study the cards

I produce two cards from each note, one to learn the species (or genus) name, and another to learn the family name. As will be mentioned in Step 5, the family name is important to learn because families have shared characteristics useful for identification.

The `taxonomy` note fields match the CSV fields
1. `scientific_name`
2. `common_names`
3. `image`
4. `rank`
5. `genus`
6. `family`

{% raw %}

Card 1 front
```
{{image}}
```

Card 1 back
```
{{FrontSide}}
<hr id=answer>
{{scientific_name}}
<br>
{{common_names}}
<br>
{{rank}}
<br>
{{genus}}
<br>
{{family}}
```

Card 2 front
```
{{scientific_name}}
<br>
{{common_names}}
<br>
{{image}}
```

Card 2 back
```
{{FrontSide}}
<hr id=answer>
{{rank}}
<br>
{{genus}}
<br>
{{family}}
```
{% endraw %}

Also, I should add that I have only been doing the Anki cards for plants thus far. I anticipate learning the species/genus names for fungi and _maybe_ animals as well, but not their family names.

## Step 5: Learn info about the family level after learning about several member species/genera

The family level is the level at which botanists can generally recognize plants previously unknown to them. I find it useful to know a few member species prior to learning the characteristics of families in order to give the family more semantic meaning, just as it's useful in learning category theory to know a few examples from math before generalizing them. A good resource for learning about native family characteristics in North America is Elpel's [Botany in a Day](https://en.wikipedia.org/wiki/Botany_in_a_Day).

## Footnotes
