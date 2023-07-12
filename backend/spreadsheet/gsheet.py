from googleapiclient.discovery import build
from google.oauth2 import service_account


class GSpreadSheet():
    SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

    SERVICE_ACCOUNT_FILE = './static/json/dowell-company-b0725e0b531b.json'

    def __init__(self, spreadsheet_id):
        creds = service_account.Credentials.from_service_account_file(self.SERVICE_ACCOUNT_FILE, scopes=self.SCOPES)
        self.service = build('sheets', 'v4', credentials=creds)
        self.spreadsheet_id = spreadsheet_id

    def get_data(self, sheet_name):
        sheet = self.service.spreadsheets()
        result = sheet.values().get(spreadsheetId=self.spreadsheet_id,
                                    range=sheet_name).execute()
        values = result.get('values', [])
        return values

    def get_column_values(self, sheet_name, column):
        _range = "{}!{}:{}".format(sheet_name, column, column)
        sheet = self.service.spreadsheets()
        result = sheet.values().get(spreadsheetId=self.spreadsheet_id,
                                    range=_range).execute()
        values = result.get('values', [])
        return values

    def appendNewRow(self, _range, values):
        body = {
            "majorDimension": "ROWS",
            'values': values,
        }

        result = self.service.spreadsheets().values().append(
            spreadsheetId=self.spreadsheet_id, range=_range,
            valueInputOption="RAW", body=body).execute()

    def searchRowIndex(self, sheetName, column, value):
        _range = "{}!{}:{}".format(sheetName, column, column)

        sheet = self.service.spreadsheets()
        result = sheet.values().get(spreadsheetId=self.spreadsheet_id, range=_range).execute()

        row_index = 0
        for row in result.get('values', []):
            row_index += 1
            if row[0] == value:
                return row_index

        return 0

    def getRowFromIndex(self, sheetName, row_index, row_start, row_end):
        _range = "{}!{}{}:{}{}".format(sheetName, row_start, row_index, row_end, row_index)

        sheet = self.service.spreadsheets()
        result = sheet.values().get(spreadsheetId=self.spreadsheet_id, range=_range).execute()

        row_array = result.get('values', [])

        if not row_array:
            print('error!. No data found.')
            return

        return row_array

    def updateRow(self, sheetName, row_index, row_start, row_end, data):
        _range = "{}!{}{}:{}{}".format(sheetName, row_start, row_index, row_end, row_index)
        print('update range', _range)
        values = [data]

        value_input_option = 'RAW'

        body = {
            "majorDimension": "ROWS",
            'values': values,
        }

        request = self.service.spreadsheets().values().update(
            spreadsheetId=self.spreadsheet_id, range=_range, valueInputOption=value_input_option, body=body)
        response = request.execute()

        return response
