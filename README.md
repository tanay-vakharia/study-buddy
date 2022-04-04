# studdy-buddy

Application made for NeuraHack 2022 with Christian Jairo Sarmiento, Emmanuel Tanumihardja, and Jasper Rei Balinas.

# Project Description

Uses a Muse 2 headset to stream EEG data to our backend, which makes a decision whether you are concentrated on your task or not. That decision made by our machine learning model is then communicated to the frontend and displayed to the user. The user can then decide to play binural beats, a sound shown to have a calming effect, to help them concentrate again. After the user's task ends, a summary is shown of how long they were concentrated for. 

Machine Learning Algorithm was based on the BCI Workshop Repository provided to us by Synaptech: https://github.com/NeuroTechX/bci-workshop/blob/master/INSTRUCTIONS.md

# Backend

Python is used for the backend. The pylsl library was used to stream real-time EEG data from the Muse 2 to our backend. The sklearn and numpy libraries were used to create our machine learning algorithm. Flask is used to communicate from our backend to the frontend.

# Frontend

React, JS, and Bootstrap was used to create our web app, which the user can use to track their concentration
