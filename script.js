// Amino acid monoisotopic masses (Da)
const aminoAcidMasses = {
    'A': 71.03711, 'R': 156.10111, 'N': 114.04293, 'D': 115.02694,
    'C': 103.00919, 'E': 129.04259, 'Q': 128.05858, 'G': 57.02146,
    'H': 137.05891, 'I': 113.08406, 'L': 113.08406, 'K': 128.09496,
    'M': 131.04049, 'F': 147.06841, 'P': 97.05276, 'S': 87.03203,
    'T': 101.04768, 'W': 186.07931, 'Y': 163.06333, 'V': 99.06841
};

// Water mass for peptide calculation
const H2O = 18.01056;

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
function calculateMass(peptideSequence) {
    let mass = H2O; // Add water for peptide
    
    for (let aa of peptideSequence) {
        if (aminoAcidMasses[aa]) {
            mass += aminoAcidMasses[aa];
        }
    }
    
    return mass;
}

// Perform tryptic digest on a single sequence
function trypticDigest(sequence, missedCleavages, chainName) {
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
                const mass = calculateMass(peptideSeq);
                peptides.push({
                    chain: chainName,
                    sequence: peptideSeq,
                    startPos: startPos + 1, // 1-indexed
                    endPos: endPos,
                    mass: mass
                });
            }
        }
    }
    
    return peptides;
}

// Perform tryptic digest on all chains
function digestAllChains(chains, missedCleavages) {
    let allPeptides = [];
    
    for (let chain of chains) {
        const peptides = trypticDigest(chain.sequence, missedCleavages, chain.header);
        allPeptides = allPeptides.concat(peptides);
    }
    
    return allPeptides;
}

// Display results in table
function displayResults(peptides) {
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
    const avgMass = totalMass / peptides.length;
    
    // Count unique chains
    const uniqueChains = [...new Set(peptides.map(p => p.chain))];
    const chainInfo = uniqueChains.length > 1 ? ` across ${uniqueChains.length} chain(s)` : '';
    
    summary.innerHTML = `
        <strong>Summary:</strong> 
        ${peptides.length} peptide(s) generated${chainInfo} | 
        Average mass: ${avgMass.toFixed(5)} Da
    `;
    
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Export to CSV
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
        
        if (!fastaInput.trim()) {
            alert('Please enter a FASTA sequence');
            return;
        }
        
        if (missedCleavages < 0 || missedCleavages > 5) {
            alert('Missed cleavages must be between 0 and 5');
            return;
        }
        
        const chains = parseFasta(fastaInput);
        if (chains.length === 0) {
            alert('No valid sequences found in FASTA input');
            return;
        }
        
        currentPeptides = digestAllChains(chains, missedCleavages);
        displayResults(currentPeptides);
        
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

document.getElementById('exportButton').addEventListener('click', () => {
    if (currentPeptides.length > 0) {
        exportToCSV(currentPeptides);
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
