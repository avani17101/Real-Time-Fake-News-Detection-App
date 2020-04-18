#!/usr/bin/env python
# coding: utf-8

# In[1]:


'''
CNN on kaggle fake news dataset 
'''
import pandas as pd
import numpy as np
import random
import keras
from keras.models import Sequential
from keras.layers import Dense
from keras.models import model_from_json
import os
def load_kagglefakenews():
  
    df = pd.read_csv('Kaggle_FakeNews/train.csv', nrows=10000, encoding='utf8')
    train_data = df['text'].values.tolist() 
    train_labels = df['label'].values.tolist() 


    combo = list(zip(train_data, train_labels))
    random.shuffle(combo)
    train_data, train_labels = zip(*combo)
    del df

    return np.asarray(train_data).tolist(), np.asarray(train_labels).tolist()


# In[2]:


train_data, train_labels = load_kagglefakenews()


# In[3]:


from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.layers import Embedding
from keras.utils import to_categorical
import pickle

MAX_NB_WORDS=50000 #dictionary size
MAX_SEQUENCE_LENGTH=1500 #max word length of each individual article
EMBEDDING_DIM=300 #dimensionality of the embedding vector (50, 100, 200, 300)
tokenizer = Tokenizer(num_words=MAX_NB_WORDS, filters='!"#$%&()*+,-./:;<=>?@[\]^_`{|}~')

def tokenize_trainingdata(texts, labels):
    tokenizer.fit_on_texts(texts)
    pickle.dump(tokenizer, open('Models/tokenizer.p', 'wb'))

    sequences = tokenizer.texts_to_sequences(texts)

    word_index = tokenizer.word_index
    print('Found %s unique tokens.' % len(word_index))

    data = pad_sequences(sequences, maxlen=MAX_SEQUENCE_LENGTH)

    labels = to_categorical(labels, num_classes=len(set(labels)))

    return data, labels, word_index



# In[4]:


X, Y, word_index = tokenize_trainingdata(train_data, train_labels)    


# In[5]:


#splitting the data (90% train, 5% test, 5% validation)
train_data = X[:int(len(X)*0.9)]
train_labels = Y[:int(len(X)*0.9)]
test_data = X[int(len(X)*0.9):int(len(X)*0.95)]
test_labels = Y[int(len(X)*0.9):int(len(X)*0.95)]
valid_data = X[int(len(X)*0.95):]
valid_labels = Y[int(len(X)*0.95):]


# In[6]:


def load_embeddings(word_index, embeddingsfile='wordEmbeddings/glove.6B.%id.txt' %EMBEDDING_DIM):
    embeddings_index = {}
    f = open(embeddingsfile, 'r', encoding='utf8')
    for line in f:
        
        values = line.split(' ') 
        word = values[0] 
        coefs = np.asarray(values[1:], dtype='float32') 
        embeddings_index[word] = coefs 
    f.close()

    print('Found %s word vectors.' % len(embeddings_index))

    embedding_matrix = np.zeros((len(word_index) + 1, EMBEDDING_DIM))
    for word, i in word_index.items():
        embedding_vector = embeddings_index.get(word)
        if embedding_vector is not None:

            embedding_matrix[i] = embedding_vector
    
    embedding_layer = Embedding(len(word_index) + 1,
                                EMBEDDING_DIM,
                                weights=[embedding_matrix],
                                input_length=MAX_SEQUENCE_LENGTH,
                                trainable=False)
    return embedding_layer
    

embedding_layer = load_embeddings(word_index)


# In[7]:


from keras import Sequential, Model, Input
from keras.layers import Conv1D, MaxPooling1D, AveragePooling1D, Flatten, Dense, GlobalAveragePooling1D, Dropout, LSTM, CuDNNLSTM, RNN, SimpleRNN, Conv2D, GlobalMaxPooling1D
from keras import callbacks

def baseline_model(sequence_input, embedded_sequences, classes=2):
    x = Conv1D(64, 5, activation='relu')(embedded_sequences)
    x = MaxPooling1D(5)(x)
    x = Conv1D(128, 3, activation='relu')(x)
    x = MaxPooling1D(5)(x)
    x = Conv1D(256, 2, activation='relu')(x)
    x = GlobalAveragePooling1D()(x)
    x = Dense(2048, activation='relu')(x)
    x = Dropout(0.5)(x)
    x = Dense(512, activation='relu')(x)
    x = Dropout(0.5)(x)
    preds = Dense(classes, activation='softmax')(x)

    model = Model(sequence_input, preds)
    return model


# In[23]:



# load json and create model
json_file = open('cnn_model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
model = model_from_json(loaded_model_json)
# load weights into new model
model.load_weights("model.h5")
print("Loaded model from disk")


# In[22]:


# serialize model to JSON
model_json = model.to_json()
with open("cnn_model.json", "w") as json_file:
    json_file.write(model_json)
# serialize weights to HDF5
model.save_weights("model.h5")
print("Saved model to disk")


# In[24]:


yhat_probs = model.predict(test_data)


# In[25]:


yhat_classes = []
for i in range(len(yhat_probs)):
    if(yhat_probs[i][0]<.5):
        yhat_classes.append(0.)
    else:
        yhat_classes.append(1.)
    
        


# In[26]:



yhat_classes = np.array(yhat_classes)
# print(yhat_classes)


# In[27]:


single_test_labels = []
for i in range(len(test_labels)):
    if(test_labels[i][0]==0):
        single_test_labels.append(0.) 
    else:
        single_test_labels.append(1.)
single_test_labels= np.array(single_test_labels)        
    
# print(single_test_labels)


# In[28]:


from sklearn.metrics import accuracy_score
from sklearn.metrics import precision_score
from sklearn.metrics import recall_score
from sklearn.metrics import f1_score
from sklearn.metrics import cohen_kappa_score
from sklearn.metrics import roc_auc_score
from sklearn.metrics import confusion_matrix
# accuracy: (tp + tn) / (p + n)
accuracy = accuracy_score(single_test_labels, yhat_classes)
print('Accuracy: %f' % accuracy)
# precision tp / (tp + fp)
precision = precision_score(single_test_labels, yhat_classes)
print('Precision: %f' % precision)
# recall: tp / (tp + fn)
recall = recall_score(single_test_labels, yhat_classes)
print('Recall: %f' % recall)
# f1: 2 tp / (2 tp + fp + fn)
f1 = f1_score(single_test_labels, yhat_classes)
print('F1 score: %f' % f1)


# In[29]:


def tokenize_text(text):
    sequences = tokenizer.texts_to_sequences(text)
    data = pad_sequences(sequences, maxlen=MAX_SEQUENCE_LENGTH)

    return data


# In[30]:


def tokenize_text(text):
    sequences = tokenizer.texts_to_sequences(text)
    data = pad_sequences(sequences, maxlen=MAX_SEQUENCE_LENGTH)

    return data


# In[33]:


#prediction on real time data
f1 = open('scraping/article.txt', "r")
text = f1.read()
#tokenize
tok = tokenize_text([text])
pred = model.predict(tok) # % real %fake
print(pred*100)


# In[34]:


print(text)


# In[ ]:




