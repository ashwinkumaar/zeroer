class CustomException(Exception):
    def __init__(self, message, resource=None, **kwargs) -> None:
        super().__init__(**kwargs)
        self._message = message
        self._resource = resource

    @property
    def message(self):
        return self._message
        
    @property
    def resource(self):
        return self._resource
    
    @message.setter
    def message(self, message):
        self._message = message
    
    @resource.setter
    def resource(self, resource):
        self._resource = resource

    def json(self) -> dict:
        return {
            "message": self.message,
            "resource": self.resource
        }
    def __repr__(self) -> str:
        return f'{self.json()}'
