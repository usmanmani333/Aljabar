import React, { useState } from 'react';
import { X, BookOpen, Calculator, Search } from 'lucide-react';

interface LogTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogTableLookupModal: React.FC<LogTableModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'logTable' | 'antilogTable'>('calculator');
  const [inputVal, setInputVal] = useState<string>('13.45');

  if (!isOpen) return null;

  // Compute 4-figure table lookup components for positive number
  const num = parseFloat(inputVal) || 0;
  let charVal = 0;
  let rowStr = '';
  let colStr = '';
  let meanDiffColStr = '';
  let baseLookup = 0;
  let meanDiffVal = 0;
  let mantissa = 0;
  let finalLog = 0;

  if (num > 0) {
    const rawLog = Math.log10(num);
    charVal = Math.floor(rawLog);

    // Normalize significant digits
    const sigDigits = num.toString().replace('.', '').replace(/^0+/, '');
    if (sigDigits.length >= 2) {
      rowStr = sigDigits.substring(0, 2);
      colStr = sigDigits.length >= 3 ? sigDigits[2] : '0';
      meanDiffColStr = sigDigits.length >= 4 ? sigDigits[3] : '';

      // Approximated 4-figure table values
      const baseLogVal = Math.log10(parseFloat(`${rowStr}.${colStr}`)) - Math.floor(Math.log10(parseFloat(`${rowStr}.${colStr}`)));
      baseLookup = Math.round(baseLogVal * 10000);

      if (meanDiffColStr && meanDiffColStr !== '0') {
        meanDiffVal = Math.round((parseInt(meanDiffColStr, 10) / 10) * 35);
      }
      mantissa = (baseLookup + meanDiffVal) / 10000;
      finalLog = charVal + mantissa;
    }
  }

  // Sample Log Table rows (representing textbook pages 283-284)
  const sampleLogRows = [
    { row: '10', cols: ['0000', '0043', '0086', '0128', '0170', '0212', '0253', '0294', '0334', '0374'], mDiff: ['4', '8', '12', '17', '21', '25', '29', '34', '38'] },
    { row: '11', cols: ['0414', '0453', '0492', '0531', '0569', '0607', '0645', '0682', '0719', '0755'], mDiff: ['4', '8', '12', '15', '19', '23', '27', '31', '35'] },
    { row: '12', cols: ['0792', '0828', '0864', '0899', '0934', '0969', '1004', '1038', '1072', '1106'], mDiff: ['3', '7', '10', '14', '17', '21', '24', '28', '31'] },
    { row: '13', cols: ['1139', '1173', '1206', '1239', '1271', '1303', '1335', '1367', '1399', '1430'], mDiff: ['3', '7', '10', '13', '16', '20', '23', '26', '30'] },
    { row: '14', cols: ['1461', '1492', '1523', '1553', '1584', '1614', '1644', '1673', '1703', '1732'], mDiff: ['3', '6', '9', '12', '15', '18', '21', '24', '27'] },
    { row: '20', cols: ['3010', '3032', '3054', '3075', '3096', '3118', '3139', '3160', '3181', '3201'], mDiff: ['2', '4', '6', '8', '11', '13', '15', '17', '19'] },
    { row: '31', cols: ['4914', '4928', '4942', '4955', '4969', '4983', '4997', '5011', '5024', '5038'], mDiff: ['1', '3', '4', '6', '7', '8', '10', '11', '12'] },
    { row: '52', cols: ['7160', '7168', '7177', '7185', '7193', '7202', '7210', '7218', '7226', '7235'], mDiff: ['1', '2', '3', '3', '4', '5', '6', '7', '7'] },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="font-semibold text-slate-900">Textbook Logarithm Reference Table</h3>
              <p className="text-xs text-slate-500">Based on PCTB Class 9 Mathematics (Pages 283–288)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 text-xs font-medium">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'calculator'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Lookup Explainer
          </button>
          <button
            onClick={() => setActiveTab('logTable')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'logTable'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Logarithm Table View
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'calculator' && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Enter number to find common log (e.g. 13.45, 725, 0.0567):
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      placeholder="e.g. 13.45"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-mono"
                    />
                  </div>
                  <button
                    onClick={() => setInputVal('13.45')}
                    className="px-3 py-2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors font-medium"
                  >
                    Ex. 13.45
                  </button>
                  <button
                    onClick={() => setInputVal('3177')}
                    className="px-3 py-2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors font-medium"
                  >
                    Ex. 3177
                  </button>
                </div>
              </div>

              {num > 0 && rowStr ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-lg">
                      <span className="font-semibold text-indigo-900">Step 1: Characteristic</span>
                      <p className="mt-1 text-slate-600">
                        {num >= 1 ? (
                          <>
                            Number of digits to the left of decimal minus 1 ={' '}
                            <span className="font-mono font-bold text-indigo-700">
                              {Math.floor(num).toString().length} - 1 = {charVal}
                            </span>
                          </>
                        ) : (
                          <>
                            Number is less than 1. Characteristic is negative:{' '}
                            <span className="font-mono font-bold text-indigo-700">
                              -{Math.abs(charVal)}
                            </span>
                          </>
                        )}
                      </p>
                    </div>

                    <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-lg">
                      <span className="font-semibold text-emerald-900">Step 2: Mantissa Table Lookup</span>
                      <p className="mt-1 text-slate-600">
                        Row <strong className="text-slate-800">{rowStr}</strong>, Column{' '}
                        <strong className="text-slate-800">{colStr}</strong> ={' '}
                        <span className="font-mono font-bold text-emerald-700">{baseLookup}</span>
                        {meanDiffColStr && (
                          <>
                            {' '}+ Mean Diff col <strong>{meanDiffColStr}</strong> ({meanDiffVal})
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 text-white rounded-xl text-center space-y-1">
                    <div className="text-xs text-slate-400">Total Logarithm Value:</div>
                    <div className="text-xl font-mono font-bold text-emerald-400">
                      log({num}) = {finalLog.toFixed(4)}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Characteristic ({charVal}) + Mantissa (.{ (baseLookup + meanDiffVal).toString().padStart(4, '0') })
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-slate-500">
                  Enter a valid positive number to see the step-by-step lookup breakdown.
                </div>
              )}
            </div>
          )}

          {activeTab === 'logTable' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                Logarithm Table (sample extract from pages 283–284). Rows indicate the first two digits; columns 0–9 show the 4-figure mantissa.
              </p>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-xs text-center border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-semibold">
                    <tr>
                      <th className="p-2 border border-slate-200 bg-slate-200">No.</th>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((c) => (
                        <th key={c} className="p-1 border border-slate-200 w-10">
                          {c}
                        </th>
                      ))}
                      <th className="p-2 border border-slate-200 bg-slate-200" colSpan={9}>
                        Mean Difference (1–9)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    {sampleLogRows.map((r) => (
                      <tr key={r.row} className="hover:bg-indigo-50/50">
                        <td className="p-1.5 border border-slate-200 font-bold bg-slate-50 text-slate-900">
                          {r.row}
                        </td>
                        {r.cols.map((val, idx) => (
                          <td key={idx} className="p-1 border border-slate-200 text-slate-700">
                            {val}
                          </td>
                        ))}
                        {r.mDiff.map((md, idx) => (
                          <td key={`md-${idx}`} className="p-1 border border-slate-200 text-slate-500 text-[10px]">
                            {md}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            Close Table
          </button>
        </div>
      </div>
    </div>
  );
};
