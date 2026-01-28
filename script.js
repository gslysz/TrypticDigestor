// Amino acid monoisotopic masses (Da)
const aminoAcidMasses = {
    'A': 71.03711, 'R': 156.10111, 'N': 114.04293, 'D': 115.02694,
    'C': 103.00919, 'E': 129.04259, 'Q': 128.05858, 'G': 57.02146,
    'H': 137.05891, 'I': 113.08406, 'L': 113.08406, 'K': 128.09496,
    'M': 131.04049, 'F': 147.06841, 'P': 97.05276, 'S': 87.03203,
    'T': 101.04768, 'W': 186.07931, 'Y': 163.06333, 'V': 99.06841
};

// Amino acid elemental compositions (residue form - minus H2O)
// Format: { C, H, N, O, S }
const aminoAcidCompositions = {
    'A': { C: 3, H: 5, N: 1, O: 1, S: 0 },   // Alanine
    'R': { C: 6, H: 12, N: 4, O: 1, S: 0 },  // Arginine
    'N': { C: 4, H: 6, N: 2, O: 2, S: 0 },   // Asparagine
    'D': { C: 4, H: 5, N: 1, O: 3, S: 0 },   // Aspartic acid
    'C': { C: 3, H: 5, N: 1, O: 1, S: 1 },   // Cysteine
    'E': { C: 5, H: 7, N: 1, O: 3, S: 0 },   // Glutamic acid
    'Q': { C: 5, H: 8, N: 2, O: 2, S: 0 },   // Glutamine
    'G': { C: 2, H: 3, N: 1, O: 1, S: 0 },   // Glycine
    'H': { C: 6, H: 7, N: 3, O: 1, S: 0 },   // Histidine
    'I': { C: 6, H: 11, N: 1, O: 1, S: 0 },  // Isoleucine
    'L': { C: 6, H: 11, N: 1, O: 1, S: 0 },  // Leucine
    'K': { C: 6, H: 12, N: 2, O: 1, S: 0 },  // Lysine
    'M': { C: 5, H: 9, N: 1, O: 1, S: 1 },   // Methionine
    'F': { C: 9, H: 9, N: 1, O: 1, S: 0 },   // Phenylalanine
    'P': { C: 5, H: 7, N: 1, O: 1, S: 0 },   // Proline
    'S': { C: 3, H: 5, N: 1, O: 2, S: 0 },   // Serine
    'T': { C: 4, H: 7, N: 1, O: 2, S: 0 },   // Threonine
    'W': { C: 11, H: 10, N: 2, O: 1, S: 0 }, // Tryptophan
    'Y': { C: 9, H: 9, N: 1, O: 2, S: 0 },   // Tyrosine
    'V': { C: 5, H: 9, N: 1, O: 1, S: 0 }    // Valine
};

// Water mass for peptide calculation
const H2O = 18.01056;

// Carbamidomethyl modification (iodoacetamide alkylation of cysteine)
const CARBAMIDOMETHYL = {
    mass: 57.02146,
    composition: { C: 2, H: 3, N: 1, O: 1, S: 0 }
};

// Predefined protein sequences
const proteinLibrary = {
    nist: `>light chain
DIQMTQSPSTLSASVGDRVTITCSASSRVGYMHWYQQKPGKAPKLLIYDTSKLASGVPSRFSGSGSGTEFTLTISSLQPDDFATYYCFQGSGYPFTFGGGTKVEIKRTVAAPSVFIFPPSDEQLKSGTASVVCLLNNFYPREAKVQWKVDNALQSGNSQESVTEQDSKDSTYSLSSTLTLSKADYEKHKVYACEVTHQGLSSPVTKSFNRGEC
>heavy chain
QVTLRESGPALVKPTQTLTLTCTFSGFSLSTAGMSVGWIRQPPGKALEWLADIWWDDKKHYNPSLKDRLTISKDTSKNQVVLKVTNMDPADTATYYCARDMIFNFYFDVWGQGTTVTVSSASTKGPSVFPLAPSSKSTSGGTAALGCLVKDYFPEPVTVSWNSGALTSGVHTFPAVLQSSGLYSLSSVVTVPSSSLGTQTYICNVNHKPSNTKVDKRVEPKSCDKTHTCPPCPAPELLGGPSVFLFPPKPKDTLMISRTPEVTCVVVDVSHEDPEVKFNWYVDGVEVHNAKTKPREEQYNSTYRVVSVLTVLHQDWLNGKEYKCKVSNKALPAPIEKTISKAKGQPREPQVYTLPPSREEMTKNQVSLTCLVKGFYPSDIAVEWESNGQPENNYKTTPPVLDSDGSFFLYSKLTVDKSRWQQGNVFSCSVMHEALHNHYTQKSLSLSPGK`,
    
    herceptin: `>A: Light chain 1
DIQMTQSPSSLSASVGDRVTITCRASQDVNTAVAWYQQKPGKAPKLLIYSASFLYSGVPSRFSGSRSGTDFTLTISSLQPEDFATYYCQQHYTTPPTFGQGTKVEIKRTVAAPSVFIFPPSDEQLKSGTASVVCLLNNFYPREAKVQWKVDNALQSGNSQEDFASDSVTEQDSKDSTYSLSSTLTLSKADYEKHKVYACEVTHQGLSSPVTKSFNRGEC
>B: Light chain 2
DIQMTQSPSSLSASVGDRVTITCRASQDVNTAVAWYQQKPGKAPKLLIYSASFLYSGVPSRFSGSRSGTDFTLTISSLQPEDFATYYCQQHYTTPPTFGQGTKVEIKRTVAAPSVFIFPPSDEQLKSGTASVVCLLNNFYPREAKVQWKVDNALQSGNSQESVTEQDSKDSTYSLSSTLTLSKADYEKHKVYACEVTHQGLSSPVTKSFNRGEC
>C: Heavy chain 1
EVQLVESGGGLVQPGGSLRLSCAASGFNIKDTYIHWVRQAPGKGLEWVARIYPTNGYTRYADSVKGRFTISADTSKNTAYLQMNSLRAEDTAVYYCSRWGGDGFYAMDYWGQGTLVTVSSASTKGPSVFPLAPSSKSTSGGTAALGCLVKDYFPEPVTVSWNSGALTSGVHTFPAVLQSSGLYSLSSVVTVPSSSLGTQTYICNVNHKPSNTKVDKKVEPKSCDKTHTCPPCPAPELLGGPSVFLFPPKPKDTLMISRTPEVTCVVVDVSHEDPEVKFNWYVDGVEVHNAKTKPREEQYNSTYRVVSVLTVLHQDWLNGKEYKCKVSNKALPAPIEKTISKAKGQPREPQVYTLPPSREEMTKNQVSLTCLVKGFYPSDIAVEWESNGQPENNYKTTPPVLDSDGSFFLYSKLTVDKSRWQQGNVFSCSVMHEALHNHYTQKSLSLSPG
>D: Heavy chain 2
EVQLVESGGGLVQPGGSLRLSCAASGFNIKDTYIHWVRQAPGKGLEWVARIYPTNGYTRYADSVKGRFTISADTSKNTAYLQMNSLRAEDTAVYYCSRWGGDGFYAMDYWGQGTLVTVSSASTKGPSVFPLAPSSKSTSGGTAALGCLVKDYFPEPVTVSWNSGALTSGVHTFPAVLQSSGLYSLSSVVTVPSSSLGTQTYICNVNHKPSNTKVDKKVEPKSCDKTHTCPPCPAPELLGGPSVFLFPPKPKDTLMISRTPEVTCVVVDVSHEDPEVKFNWYVDGVEVHNAKTKPREEQYNSTYRVVSVLTVLHQDWLNGKEYKCKVSNKALPAPIEKTISKAKGQPREPQVYTLPPSREEMTKNQVSLTCLVKGFYPSDIAVEWESNGQPENNYKTTPPVLDSDGSFFLYSKLTVDKSRWQQGNVFSCSVMHEALHNHYTQKSLSLSPG`,
    
    enolase: `>Enolase1 sp|P00924|Enolase
AVSKVYARSVYDSRGNPTVEVELTTEKGVFRSIVPSGASTGVHEALEMRDGDKSKWMGKGVLHAVKNVNDVIAPAFVKANIDVKDQKAVDDFLISLDGTANKSKLGANAILGVSLAASRAAAAEKNVPLYKHLADLSKSKTSPYVLPVPFLNVLNGGSHAGGALALQEFMIAPTGAKTFAEALRIGSEVYHNLKSLTKKRYGASAGNVGDEGGVAPNIQTAEEALDLIVDAIKAAGHDGKVKIGLDCASSEFFKDGKYDLDFKNPNSDKSKWLTGPQLADLYHSLMKRYPIVSIEDPFAEDDWEAWSHFFKTAGIQIVADDLTVTNPKRIATAIEKKAADALLLKVNQIGTLSESIKAAQDSFAAGWGVMVSHRSGETEDTFIADLVVGLRTGQIKTGAPARSERLAKLNQLLRIEEELGDNAVFAGENFHHGDKL`,
    
    bsa: `>sp|P02769|ALBU_BOVIN
MKWVTFISLLLLFSSAYSRGVFRRDTHKSEIAHRFKDLGEEHFKGLVLIAFSQYLQQCPFDEHVKLVNELTEFAKTCVADESHAGCEKSLHTLFGDELCKVASLRETYGDMADCCEKQEPERNECFLSHKDDSPDLPKLKPDPNTLCDEFKADEKKFWGKYLYEIARRHPYFYAPELLYYANKYNGVFQECCQAEDKGACLLPKIETMREKVLASSARQRLRCASIQKFGERALKAWSVARLSQKFPKAEFVEVTKLVTDLTKVHKECCHGDLLECADDRADLAKYICDNQDTISSKLKECCDKPLLEKSHCIAEVEKDAIPENLPPLTADFAEDKDVCKNYQEAKDAFLGSFLYEYSRRHPEYAVSVLLRLAKEYEATLEECCAKDDPHACYSTVFDKLKHLVDEPQNLIKQNCDQFEKLGEYGFQNALIVRYTRKVPQVSTPTLVEVSRSLGKVGTRCCTKPESERMPCTEDYLSLILNRLCVLHEKTPVSEKVTKCCTESLVNRRPCFSALTPDETYVPKAFDEKLFTFHADICTLPDTEKQIKKQTALVELLKHKPKATEEQLKTVMENFVAFVDKCCAADDKEACFAVEGPKLVVSTQTALA`
};

// Calculate elemental composition for a peptide sequence
function calculateFormula(peptideSequence, cysteineAlkylation = false) {
    // Start with water (H2O) for the peptide termini
    let composition = { C: 0, H: 2, N: 0, O: 1, S: 0 };
    
    for (let aa of peptideSequence) {
        if (aminoAcidCompositions[aa]) {
            const aaComp = aminoAcidCompositions[aa];
            composition.C += aaComp.C;
            composition.H += aaComp.H;
            composition.N += aaComp.N;
            composition.O += aaComp.O;
            composition.S += aaComp.S;
            
            // Add carbamidomethyl modification for cysteines
            if (aa === 'C' && cysteineAlkylation) {
                composition.C += CARBAMIDOMETHYL.composition.C;
                composition.H += CARBAMIDOMETHYL.composition.H;
                composition.N += CARBAMIDOMETHYL.composition.N;
                composition.O += CARBAMIDOMETHYL.composition.O;
            }
        }
    }
    
    return composition;
}

// Format elemental composition as a formula string (e.g., "C172H265N43O51S2")
function formatFormula(composition) {
    let formula = '';
    
    // Standard order: C, H, N, O, S
    if (composition.C > 0) formula += 'C' + (composition.C > 1 ? composition.C : '');
    if (composition.H > 0) formula += 'H' + (composition.H > 1 ? composition.H : '');
    if (composition.N > 0) formula += 'N' + (composition.N > 1 ? composition.N : '');
    if (composition.O > 0) formula += 'O' + (composition.O > 1 ? composition.O : '');
    if (composition.S > 0) formula += 'S' + (composition.S > 1 ? composition.S : '');
    
    return formula;
}

// Parse FASTA sequence (supports multiple chains/proteins)
function parseFasta(fastaInput) {
    const lines = fastaInput.trim().split('\n');
    const chains = [];
    let currentChain = null;
    
    for (let line of lines) {
        line = line.trim();
        if (line.startsWith('>')) {
            // Save previous chain if exists
            if (currentChain && currentChain.sequence) {
                chains.push(currentChain);
            }
            // Start new chain
            currentChain = {
                header: line.substring(1).trim(), // Remove '>' and trim
                sequence: ''
            };
        } else if (currentChain) {
            currentChain.sequence += line.toUpperCase().replace(/\s/g, '');
        }
    }
    
    // Add last chain
    if (currentChain && currentChain.sequence) {
        chains.push(currentChain);
    }
    
    // Validate sequences
    const validAminoAcids = Object.keys(aminoAcidMasses).join('');
    for (let chain of chains) {
        const invalidChars = chain.sequence.split('').filter(char => !validAminoAcids.includes(char));
        if (invalidChars.length > 0) {
            throw new Error(`Invalid amino acid(s) in ${chain.header}: ${[...new Set(invalidChars)].join(', ')}`);
        }
    }
    
    return chains;
}

// Calculate peptide mass
function calculateMass(peptideSequence, cysteineAlkylation = false) {
    let mass = H2O; // Add water for peptide
    
    for (let aa of peptideSequence) {
        if (aminoAcidMasses[aa]) {
            mass += aminoAcidMasses[aa];
            
            // Add carbamidomethyl modification for cysteines
            if (aa === 'C' && cysteineAlkylation) {
                mass += CARBAMIDOMETHYL.mass;
            }
        }
    }
    
    return mass;
}

// Perform tryptic digest on a single sequence
function trypticDigest(sequence, missedCleavages, chainName, cysteineAlkylation = false) {
    const peptides = [];
    const cleavageSites = [];
    
    // Find all cleavage sites (after K or R, but not before P)
    for (let i = 0; i < sequence.length - 1; i++) {
        if ((sequence[i] === 'K' || sequence[i] === 'R') && sequence[i + 1] !== 'P') {
            cleavageSites.push(i + 1);
        }
    }
    
    // Add start and end positions
    cleavageSites.unshift(0);
    cleavageSites.push(sequence.length);
    
    // Generate peptides with missed cleavages
    for (let i = 0; i < cleavageSites.length - 1; i++) {
        for (let j = i + 1; j <= Math.min(i + missedCleavages + 1, cleavageSites.length - 1); j++) {
            const startPos = cleavageSites[i];
            const endPos = cleavageSites[j];
            const peptideSeq = sequence.substring(startPos, endPos);
            
            if (peptideSeq.length > 0) {
                const mass = calculateMass(peptideSeq, cysteineAlkylation);
                const composition = calculateFormula(peptideSeq, cysteineAlkylation);
                const formula = formatFormula(composition);
                
                peptides.push({
                    chain: chainName,
                    sequence: peptideSeq,
                    startPos: startPos + 1, // 1-indexed
                    endPos: endPos,
                    mass: mass,
                    formula: formula,
                    composition: composition
                });
            }
        }
    }
    
    return peptides;
}

// Perform tryptic digest on all chains
function digestAllChains(chains, missedCleavages, cysteineAlkylation = false) {
    let allPeptides = [];
    
    for (let chain of chains) {
        const peptides = trypticDigest(chain.sequence, missedCleavages, chain.header, cysteineAlkylation);
        allPeptides = allPeptides.concat(peptides);
    }
    
    return allPeptides;
}

// Display results in table
function displayResults(peptides, filteredCount = 0) {
    const resultsBody = document.getElementById('resultsBody');
    const resultsSection = document.getElementById('resultsSection');
    const summary = document.getElementById('summary');
    
    resultsBody.innerHTML = '';
    
    peptides.forEach((peptide, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${peptide.chain}</td>
            <td>${peptide.sequence}</td>
            <td>${peptide.startPos}</td>
            <td>${peptide.endPos}</td>
            <td>${peptide.mass.toFixed(5)}</td>
        `;
        resultsBody.appendChild(row);
    });
    
    // Show summary
    const totalMass = peptides.reduce((sum, p) => sum + p.mass, 0);
    const avgMass = peptides.length > 0 ? totalMass / peptides.length : 0;
    
    // Count unique chains
    const uniqueChains = [...new Set(peptides.map(p => p.chain))];
    const chainInfo = uniqueChains.length > 1 ? ` across ${uniqueChains.length} chain(s)` : '';
    const filteredInfo = filteredCount > 0 ? ` | ${filteredCount} peptide(s) filtered out` : '';
    
    summary.innerHTML = `
        <strong>Summary:</strong> 
        ${peptides.length} peptide(s) generated${chainInfo} | 
        Average mass: ${avgMass.toFixed(5)} Da${filteredInfo}
    `;
    
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Export to CSV (original format)
function exportToCSV(peptides) {
    const headers = ['ID', 'Chain/Protein', 'Sequence', 'Start Position', 'End Position', 'Mass (Da)'];
    const rows = peptides.map((peptide, index) => [
        index + 1,
        `"${peptide.chain}"`, // Quote to handle commas in chain names
        peptide.sequence,
        peptide.startPos,
        peptide.endPos,
        peptide.mass.toFixed(5)
    ]);
    
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
        csv += row.join(',') + '\n';
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tryptic_digest_results.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Export to Compound Database format
// Format: Formula, RT, Mass, Cpd, Comments
// Example: C172H265N43O51,,3748.9465,SequenceName,1-31
function exportToCompoundDB(peptides) {
    // Get selected protein name for filename
    const proteinSelect = document.getElementById('proteinSelect');
    const selectedOption = proteinSelect.options[proteinSelect.selectedIndex];
    const proteinName = selectedOption.text.replace(/[^a-zA-Z0-9]/g, '_'); // Sanitize for filename
    
    // Header comments
    let csv = '# Compound database,,,,\n';
    csv += '# Version: TrypticDigestor Export,,,,\n';
    csv += '### Formula, Retention Time, Mass, Compound name, Description\n';
    csv += '# Formula, RT, Mass, Cpd, Comments\n';
    
    // Data rows
    peptides.forEach(peptide => {
        const formula = peptide.formula;
        const rt = ''; // Empty retention time
        const mass = peptide.mass.toFixed(4);
        const cpd = peptide.sequence; // Sequence as compound name
        const comments = `${peptide.startPos}-${peptide.endPos}`; // Position range
        
        csv += `${formula},${rt},${mass},${cpd},${comments}\n`;
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${proteinName}_trypticDigest_db.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Sorting functionality
let currentSort = { column: null, direction: null };

function sortTable(columnIndex, dataType) {
    const tbody = document.getElementById('resultsBody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Determine sort direction
    let direction = 'asc';
    if (currentSort.column === columnIndex && currentSort.direction === 'asc') {
        direction = 'desc';
    }
    
    // Sort rows
    rows.sort((a, b) => {
        const aValue = a.children[columnIndex].textContent.trim();
        const bValue = b.children[columnIndex].textContent.trim();
        
        let comparison = 0;
        if (dataType === 'number') {
            comparison = parseFloat(aValue) - parseFloat(bValue);
        } else {
            comparison = aValue.localeCompare(bValue);
        }
        
        return direction === 'asc' ? comparison : -comparison;
    });
    
    // Clear and re-append sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    // Update sort indicators
    document.querySelectorAll('th.sortable').forEach(th => {
        th.classList.remove('asc', 'desc');
    });
    
    const header = document.querySelector(`th.sortable[data-column="${columnIndex}"]`);
    if (header) {
        header.classList.add(direction);
    }
    
    // Store current sort state
    currentSort = { column: columnIndex, direction: direction };
}

// Event listeners
let currentPeptides = [];

document.getElementById('digestButton').addEventListener('click', () => {
    try {
        const fastaInput = document.getElementById('fastaInput').value;
        const missedCleavages = parseInt(document.getElementById('missedCleavages').value);
        const minPeptideLength = parseInt(document.getElementById('minPeptideLength').value) || 1;
        const cysteineAlkylation = document.getElementById('cysteineAlkylation').checked;
        
        if (!fastaInput.trim()) {
            alert('Please enter a FASTA sequence');
            return;
        }
        
        if (missedCleavages < 0 || missedCleavages > 5) {
            alert('Missed cleavages must be between 0 and 5');
            return;
        }
        
        if (minPeptideLength < 1 || minPeptideLength > 100) {
            alert('Minimum peptide length must be between 1 and 100');
            return;
        }
        
        const chains = parseFasta(fastaInput);
        if (chains.length === 0) {
            alert('No valid sequences found in FASTA input');
            return;
        }
        
        // Generate peptides and filter by minimum length
        let allPeptides = digestAllChains(chains, missedCleavages, cysteineAlkylation);
        const unfilteredCount = allPeptides.length;
        
        currentPeptides = allPeptides.filter(p => p.sequence.length >= minPeptideLength);
        const filteredCount = unfilteredCount - currentPeptides.length;
        
        displayResults(currentPeptides, filteredCount);
        
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

document.getElementById('exportButton').addEventListener('click', () => {
    if (currentPeptides.length > 0) {
        exportToCSV(currentPeptides);
    }
});

// Export to Compound DB button
document.getElementById('exportCompoundDBButton')?.addEventListener('click', () => {
    if (currentPeptides.length > 0) {
        exportToCompoundDB(currentPeptides);
    }
});

// Add click handlers to sortable headers
document.querySelectorAll('th.sortable').forEach(header => {
    header.addEventListener('click', () => {
        const columnIndex = parseInt(header.dataset.column);
        const dataType = header.dataset.type;
        sortTable(columnIndex, dataType);
    });
});

// Handle protein selection dropdown
document.getElementById('proteinSelect').addEventListener('change', (e) => {
    const selected = e.target.value;
    const fastaInput = document.getElementById('fastaInput');
    const isMinimalist = document.body.classList.contains('minimalist');
    
    if (selected !== 'custom' && proteinLibrary[selected]) {
        fastaInput.value = proteinLibrary[selected];
        fastaInput.readOnly = true;
        fastaInput.style.backgroundColor = isMinimalist ? '#f8f9fa' : 'rgba(22, 33, 62, 0.5)';
    } else {
        fastaInput.readOnly = false;
        fastaInput.style.backgroundColor = isMinimalist ? 'white' : '#16213e';
    }
});

// Handle theme toggle
document.getElementById('themeToggle').addEventListener('change', (e) => {
    const themeLabel = document.querySelector('.theme-label');
    
    if (e.target.checked) {
        document.body.classList.remove('minimalist');
        themeLabel.textContent = 'Cyberpunk Mode';
    } else {
        document.body.classList.add('minimalist');
        themeLabel.textContent = 'Minimalist Mode';
    }
    
    // Update textarea background if protein is selected
    const fastaInput = document.getElementById('fastaInput');
    const proteinSelect = document.getElementById('proteinSelect');
    if (fastaInput.readOnly) {
        fastaInput.style.backgroundColor = e.target.checked ? 'rgba(22, 33, 62, 0.5)' : '#f8f9fa';
    } else {
        fastaInput.style.backgroundColor = e.target.checked ? '#16213e' : 'white';
    }
});
