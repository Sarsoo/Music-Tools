"""Flask blueprints for loading the app endpoints
"""

from .api import blueprint as api_blueprint
from .player import blueprint as player_blueprint
from .fm import blueprint as fm_blueprint
from .spotfm import blueprint as spotfm_blueprint
from .spotify import blueprint as spotify_blueprint
from .admin import blueprint as admin_blueprint
from .tag import blueprint as tag_blueprint
