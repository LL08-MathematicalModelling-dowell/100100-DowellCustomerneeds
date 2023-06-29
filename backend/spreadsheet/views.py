from django.shortcuts import render
from rest_framework.views import APIView , Response
from .gsheet import GSpreadSheet

class SpreadsheetView(APIView):

    def get(self, request):
        spreadsheet_id = '1hFy7HHAmbAhURqpsmfjSVOAchbjjITJwH-9r3xWjdts'
        sheet_name = 'Sheet1'
        gsheet = GSpreadSheet(spreadsheet_id)
        data = gsheet.get_data(sheet_name)
        return Response(data)