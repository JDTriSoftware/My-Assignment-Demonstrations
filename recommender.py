""" This is some starter code for your recommendation system assignment. You
may adapt this code as you see fit.

This program is a python implementation of an article loader and similiarty reccomender. It accepts csv or json, parses them into key-value articles.
The number of reccomendations can be customized, which initially will be random when displayed to the user. The user can select the article they wish to read which also searches another article
based on similarity using vectorization and cosine_similarity. A new reccomended list of articles is then redisplayed to the user, with strongest mactches at top in descending order
Output contains debugging and snapshots of program execution.
The user can continue reading and searching articles until desired exit.

Sam Scott, Mohawk College, 2023
Justin Triantafilou, 000775460, Mohawk College, 2024
"""

from csv import DictReader
from random import randint, shuffle
import json

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as panda  # For interpretable data output
import numpy as nump  # For argsort based on source research

NUM_RECS = 51  # number of recommendations to return to the user


def load_articles(filename, num=None, filetype="csv"):
    """Returns a list of articles loaded from a json or csv file with a header.
    Each article is a dictionary. If you use one of the files provided, each
    article will have a "title" and "text" field.

    filename = name of file to load
    num = number of articles to load (random sample), or None for all articles
    filtype = "csv" or "json" """
    articles = []
    if filetype == "csv":
        with open(filename, encoding="utf-8") as csvfile:
            reader = DictReader(csvfile)
            for row in reader:
                articles.append(row)
    elif filetype == "json":
        with open(filename, encoding="utf-8") as jsonfile:
            articles = json.loads(jsonfile.read())
    for row in articles:
        if row["title"] == None:
            row["title"] = row["text"][:30]
    if num:
        shuffle(articles)
        articles = articles[:num]

    texts = []
    for article in articles:
        texts.append(article["text"])

    vectorizer = TfidfVectorizer(ngram_range=(1, 2), min_df=0.01, max_df=0.9) #exclude extremely rare and extremely common tokens, find bi-grams
    # token_pattern=r"\b\w+\b"
    vectors = vectorizer.fit_transform(texts)

    print("tokens")
    print(vectorizer.get_feature_names_out())

    print("\ntoken Count")
    print(vectors)

    print(len(articles), "articles loaded")
    return articles, vectors


def init_recommendations(n, articles):
    """This generates n random recommendations."""
    recommendations = []
    for _ in range(n):
        article = randint(0, len(articles) - 1)
        while article in recommendations:
            article = randint(0, len(articles) - 1)
        recommendations.append(article)
    return recommendations


def display_recommendations(recommendations, articles):
    """Displays recommendations. The recommendations parameter should be a list
    of index numbers representing the recommended articles."""
    print("\n\n\nHere are some new recommendations for you:\n")
    for i in range(len(recommendations)):
        art_num = recommendations[i]
        print(str(i + 1) + ".", articles[art_num]["title"])


def display_article(art_num, articles):
    """Displays article 'art_num' from the articles"""
    print("\n\n")
    print("article", art_num)
    print("=========================================")
    print(articles[art_num]["title"])
    print()
    print(articles[art_num]["text"])
    print("=========================================")
    print("\n\n")


def new_recommendations(last_choice, n, vectored_articles, articles):
    """Generates recommendations based on the articles. Calculates cosine similarty using a vectored matrix of articles.
    Extracts a row index from the 2d cosine_simil_matrix based on user selection which essentially chooses an article as an index.
    numpy argsort is used via stackoverflow source reccomendation to obtain the order of sorting without sorting, as computing time is already slow.
    The slicing is as follows n=num_recs which will be the number of articles we search for aka the top n most similar articles beginning from the end of the array but not including the
    last element as that will be the selected article with a similiartiy of 1. then count downards by 1 and reverse this order so that strongest matches are at the top.
    reccomendations are extended to the array as append causes exceptions with display_reccomendations
    Fortuneately, throughout tokenizing, similarity calculations and sorting, order is preseved, which is what makes this possible

    last_choice = index number of the last article read
    n = number of recommendations
    articles = the list of articles
    vectored_articles = tokenized articles via TFIDVector
    """

    recommendations = []

    article_simil_matrix = cosine_similarity(vectored_articles)
    displayCosMatrix = panda.DataFrame(article_simil_matrix)

    most_similar_articles = article_simil_matrix[last_choice]

    most_similar_index = np.argsort(most_similar_articles)[-n-1:-1][::-1] #SOURCE - STACKOVERFLOW ANSWER 2 https://stackoverflow.com/questions/12118720/python-tf-idf-cosine-to-find-document-similarity/18914884#18914884

    # for i in range(len(most_similar_index)):
    #     msi = most_similar_index[i]
    #     recommendations.append({
    #       articles[msi]
    #     })

    recommendations.extend(most_similar_index)

    print("matrix cos")
    print(displayCosMatrix) # A square symmentricle matric 0,0 = article 1, article 1, Row = article, showing similarty of that article to every other. Column = article, showing similarity of that article with every other
    print("similar articles matrix")
    print(panda.DataFrame(most_similar_articles)) # panda output for readability

    return recommendations


def main():
    articles, vectors = load_articles('data/wikipedia_sample.json', filetype="json")
    print("\n\n")
    recs = init_recommendations(NUM_RECS, articles)
    while True:
        display_recommendations(recs, articles)
        choice = int(input("\nYour choice? ")) - 1
        if choice < 0 or choice >= len(recs):
            print("Invalid Choice. Goodbye!")
            break
        display_article(recs[choice], articles)
        input("Press Enter")
        recs = new_recommendations(recs[choice], NUM_RECS, vectors, articles) # added articles as argument for ease of access to its indices


if __name__ == "__main__":
    main()
