class ResponseBodyJSON():
    def __init__(self, success: bool, data) -> None:
        self._success = success
        self._data = data

    @property
    def success(self):
        return self._success

    @property
    def data(self):
        return self._data

    @success.setter
    def success(self, success: bool):
        self._success = success

    @data.setter
    def data(self, data):
        self._data = data

    def json(self) -> dict:
        return {
            "success": self.success,
            "data": self.data
        }

    def __repr__(self) -> str:
        return f'{self.json()}'