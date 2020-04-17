#!/usr/bin/env python
# coding: utf-8

# In[1]:


from keras.preprocessing.text import Tokenizer
from keras.models import model_from_json
import numpy
import os
from keras.preprocessing.sequence import pad_sequences


# In[2]:


# load json and create model
json_file = open('cnn_model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
cnn_model = model_from_json(loaded_model_json)
# load weights into new model
cnn_model.load_weights("model.h5")
print("Loaded model from disk")


# In[3]:


MAX_NB_WORDS=50000 #dictionary size
MAX_SEQUENCE_LENGTH=1500 #max word length of each individual article
EMBEDDING_DIM=300 #dimensionality of the embedding vector (50, 100, 200, 300)
tokenizer = Tokenizer(num_words=MAX_NB_WORDS, filters='!"#$%&()*+,-./:;<=>?@[\]^_`{|}~')


# In[4]:


def tokenize_text(text):
    sequences = tokenizer.texts_to_sequences(text)
    data = pad_sequences(sequences, maxlen=MAX_SEQUENCE_LENGTH)

    return data


# In[5]:


f1 = open('scraping/article.txt', "r")
text = f1.read()
  
#tokenize
tok = tokenize_text([text])
pred = cnn_model.predict(tok)  #%change of being real , fake
print(pred*100)


# In[ ]:




