from .gsheet import GSpreadSheet

BASE_ID = "1r8XF8eLUmzu2rx-OC7NWzPb705qBWCKaNhFLTmt_ZSQ"


def get_regression_sheet(base_sheet, sheet_name, regression_value):
    sheet_index = base_sheet.searchRowIndex(sheet_name, "B", regression_value)
    if sheet_index is not None:
        return base_sheet.getRowFromIndex(sheet_name, sheet_index, "D", "ZZ")
    return None


def get_weight_sheet(base_sheet, sheet_name, regression_value):
    sheet_index = base_sheet.searchRowIndex(sheet_name, "B", regression_value)
    if sheet_index is not None:
        return base_sheet.getRowFromIndex(sheet_name, sheet_index, "D", "ZZ")
    return None


def calculate_result(weights, regression_sheet):
    if weights is not None and regression_sheet is not None:
        return sum([round((float(x) * float(y)), 2) for x, y in zip(weights[0], regression_sheet[0])])
    return 0


def sheet_latest_result(Q1Regression, Q2Regression, Q3Regression):
    base_sheet = GSpreadSheet(BASE_ID)

    Q1Regression_sheet = get_regression_sheet(base_sheet, "Q1Regression", Q1Regression)
    Q2Regression_sheet = get_regression_sheet(base_sheet, "Q2Regression", Q2Regression)
    Q3Regression_sheet = get_regression_sheet(base_sheet, "Q3Regression", Q3Regression.lower())

    Q1Weight = get_weight_sheet(base_sheet, "Q1Weight", Q1Regression)
    Q2Weight = get_weight_sheet(base_sheet, "Q2Weight", Q2Regression)
    Q3Weight = get_weight_sheet(base_sheet, "Q3Weight", Q3Regression.lower())

    result_one = calculate_result(Q1Weight, Q1Regression_sheet)
    result_two = calculate_result(Q2Weight, Q2Regression_sheet)
    result_three = calculate_result(Q3Weight, Q3Regression_sheet)

    return result_one, result_two, result_three
