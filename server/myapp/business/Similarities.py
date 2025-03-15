import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

from server.myapp.entities.PlayerStatsModel import PlayerStatsWithTeam


objects = PlayerStatsWithTeam.objects.all()