from pydantic import BaseModel

class DemandeRefreshToken(BaseModel):
    refresh_token : str = None