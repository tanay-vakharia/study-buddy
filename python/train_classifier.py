from copyreg import pickle
import numpy as np  # Module that simplifies computations on matrices
import matplotlib.pyplot as plt  # Module used for plotting
from pylsl import StreamInlet, resolve_byprop  # Module to receive EEG data

import bci_workshop_tools as BCIw  # Our own functions for the workshop
from pickle import dump
import joblib


if __name__ == "__main__":

    """ 1. CONNECT TO EEG STREAM """

    # Search for active LSL stream
    print('Looking for an EEG stream...')
    streams = resolve_byprop('type', 'EEG', timeout=2)
    if len(streams) == 0:
        raise RuntimeError('Can\'t find EEG stream.')

    # Set active EEG stream to inlet and apply time correction
    print("Start acquiring data")
    inlet = StreamInlet(streams[0], max_chunklen=12)
    eeg_time_correction = inlet.time_correction()

    # Get the stream info, description, sampling frequency, number of channels
    info = inlet.info()
    description = info.desc()
    fs = int(info.nominal_srate())
    n_channels = info.channel_count()

    # Get names of all channels
    ch = description.child('channels').first_child()
    ch_names = [ch.child_value('label')]
    for i in range(1, n_channels):
        ch = ch.next_sibling()
        ch_names.append(ch.child_value('label'))

    """ 2. SET EXPERIMENTAL PARAMETERS """

    # Length of the EEG data buffer (in seconds)
    # This buffer will hold last n seconds of data and be used for calculations
    buffer_length = 15

    # Length of the epochs used to compute the FFT (in seconds)
    epoch_length = 1

    # Amount of overlap between two consecutive epochs (in seconds)
    overlap_length = 0.8

    # Amount to 'shift' the start of each next consecutive epoch
    shift_length = epoch_length - overlap_length

    # Index of the channel (electrode) to be used
    # 0 = left ear, 1 = left forehead, 2 = right forehead, 3 = right ear
    index_channel = [0, 1, 2, 3]
    # Name of our channel for plotting purposes
    ch_names = [ch_names[i] for i in index_channel]
    n_channels = len(index_channel)

    # Get names of features
    # ex. ['delta - CH1', 'pwr-theta - CH1', 'pwr-alpha - CH1',...]
    feature_names = BCIw.get_feature_names(ch_names)

    # Number of seconds to collect training data for (one class)
    training_length = 60

    """ 3. RECORD TRAINING DATA """

    # Record data for mental activity 0
    # BCIw.beep()
    print('\nPay Attention!\n')
    eeg_data0, timestamps0 = inlet.pull_chunk(
            timeout=training_length+1, max_samples=fs * training_length)
    eeg_data0 = np.array(eeg_data0)[:, index_channel]

    print('\nBe Distracted!\n')

    # Record data for mental activity 1
    # BCIw.beep()  # Beep sound
    eeg_data1, timestamps1 = inlet.pull_chunk(
            timeout=training_length+1, max_samples=fs * training_length)
    eeg_data1 = np.array(eeg_data1)[:, index_channel]

    # Divide data into epochs
    eeg_epochs0 = BCIw.epoch(eeg_data0, epoch_length * fs,
                             overlap_length * fs)
    eeg_epochs1 = BCIw.epoch(eeg_data1, epoch_length * fs,
                             overlap_length * fs)

    """ 4. COMPUTE FEATURES AND TRAIN CLASSIFIER """

    feat_matrix0 = BCIw.compute_feature_matrix(eeg_epochs0, fs)
    feat_matrix1 = BCIw.compute_feature_matrix(eeg_epochs1, fs)

    [classifier, mu_ft, std_ft] = BCIw.train_classifier(
            feat_matrix0, feat_matrix1, 'SVM')
    
    #Saves classifier, mean and standard deviation using pickle
    model_fileName = "model.pkl"
    mu_fileName = "mu.pkl"
    std_fileName = "std.pkl"
    # dump(classifier, open(model_fileName, 'wb'))
    dump(mu_ft, open(mu_fileName, 'wb'))
    dump(std_ft, open(std_fileName, 'wb'))
    joblib.dump(classifier,model_fileName)
