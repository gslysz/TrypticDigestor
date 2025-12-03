# Tryptic Peptide Digestor

A web application for generating tryptic peptide digests from protein sequences in FASTA format.

## Features

- **FASTA Sequence Input**: Accepts standard FASTA-formatted protein sequences
- **Multi-Chain Support**: Process multiple chains/proteins in a single input (e.g., mAb light and heavy chains)
- **Missed Cleavages**: Configure 0-5 missed cleavage sites for comprehensive peptide generation
- **Tryptic Digest Algorithm**: Cleaves after K (Lysine) and R (Arginine), except when followed by P (Proline)
- **Peptide Mass Calculation**: Uses monoisotopic amino acid masses for accurate peptide mass determination
- **Results Table**: Displays peptide ID, chain/protein name, sequence, start/end positions, and molecular mass
- **CSV Export**: Export results to CSV format for further analysis

## Usage

### Running the Application

1. Open `index.html` in a web browser
   - Simply double-click the file, or
   - Use a local web server for development:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js http-server
     npx http-server
     ```

2. Enter your protein sequence(s) in FASTA format:
   ```
   >light chain
   DIQMTQSPSTLSASVGDRVTITCSASSRVGYMHWYQQKPGKAPKLLIYDTSKLASGVPSRFSGSGSGTEFTLTISSLQPDDFATYYCFQGSGYPFTFGGGTKVEIK
   >heavy chain
   QVTLRESGPALVKPTQTLTLTCTFSGFSLSTAGMSVGWIRQPPGKALEWLADIWWDDKKHYNPSLKDRLTISKDTSKNQVVLKVTNMDPADTATYYCAR
   ```

3. Set the number of missed cleavages (0-5)

4. Click "Generate Digest" to process the sequence

5. View results in the table and export to CSV if needed

### Understanding Tryptic Digestion

- **Cleavage Sites**: Trypsin cleaves peptide bonds after Lysine (K) and Arginine (R)
- **Proline Exception**: Cleavage does not occur when K or R is followed by Proline (P)
- **Missed Cleavages**: Allows peptides to include 1 or more cleavage sites, simulating incomplete digestion

### Example

**Input Sequence**: `MAPLRKTLVLK`

**With 0 missed cleavages**:
- `MAPLR` (1-5)
- `K` (6-6)
- `TLVLK` (7-11)

**With 1 missed cleavage**:
- `MAPLR` (1-5)
- `MAPLRK` (1-6)
- `K` (6-6)
- `KTLVLK` (6-11)
- `TLVLK` (7-11)

## Technical Details

### Mass Calculation

The application uses monoisotopic masses for each amino acid plus H₂O (18.01056 Da) for the peptide:

```
Peptide Mass = Σ(amino acid masses) + H₂O
```

### Files

- `index.html` - Main application interface
- `styles.css` - Styling and responsive design
- `script.js` - Tryptic digest algorithm and UI logic

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

## License

This project is open source and available for educational and research purposes.
