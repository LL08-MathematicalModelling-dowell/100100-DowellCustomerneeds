from .gsheet import GSpreadSheet

BASE_ID = "1r8XF8eLUmzu2rx-OC7NWzPb705qBWCKaNhFLTmt_ZSQ"
base_sheet = GSpreadSheet(BASE_ID)


def get_regression_sheet(base_sheet, sheet_name, item_id):
    _range = "{}!{}:{}".format(sheet_name, "A", "ZZ")
    sheet = base_sheet.service.spreadsheets()
    result = sheet.values().get(spreadsheetId=base_sheet.spreadsheet_id, range=_range).execute()
    values = result.get('values', [])

    for row in values:
        if row and row[0] == item_id:
            return row

    return None


def get_weight_sheet(base_sheet, sheet_name, item_id):
    _range = "{}!{}:{}".format(sheet_name, "A", "ZZ")
    sheet = base_sheet.service.spreadsheets()
    result = sheet.values().get(spreadsheetId=base_sheet.spreadsheet_id, range=_range).execute()
    values = result.get('values', [])

    for row in values:
        if row and row[0] == item_id:
            return row

    return None


def calculate_result(regression_data, weight_data):
    if regression_data is None or weight_data is None:
        return 0

    total_sum = 0.0
    for i in range(2, len(regression_data)):
        try:
            x_i = float(regression_data[i])
            b_i = float(weight_data[i])
            total_sum += x_i * b_i
        except (ValueError, IndexError):
            pass
    return total_sum


def get_data_from_sheets(sheet_name, item_id):
    regression_data = get_regression_sheet(base_sheet, f"{sheet_name}Regression", item_id)
    weight_data = get_weight_sheet(base_sheet, f"{sheet_name}Weight", item_id)
    return regression_data, weight_data


def calculate_weighted_sum(sheet_name, item_id):
    regression_data, weight_data = get_data_from_sheets(sheet_name, item_id)
    return calculate_result(regression_data, weight_data)


def get_item_name(sheet_name, item_id):
    regression_data = get_regression_sheet(base_sheet, f"{sheet_name}Regression", item_id)
    return regression_data[1] if regression_data else None
