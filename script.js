document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const strengthLevel = document.querySelector('.strength-level');
    const strengthText = document.querySelector('#strength-text span');
    const requirements = {
        length: document.getElementById('length'),
        lowercase: document.getElementById('lowercase'),
        uppercase: document.getElementById('uppercase'),
        number: document.getElementById('number'),
        special: document.getElementById('special')
    };

    // Common weak passwords and patterns
    const commonPasswords = [
        'password', '123456', '12345678', 'qwerty', 'abc123', 'admin',
        'welcome', 'monkey', 'letmein', 'dragon', 'baseball', 'football',
        'superman', 'trustno1', 'iloveyou', 'sunshine', 'master', 'hello',
        'shadow', 'ashley', 'michael', 'jennifer', 'thomas', 'jessica',
        'joshua', 'michelle', 'charlie', 'andrew', 'matthew', 'jordan'
    ];

    // Check for repeated characters
    function hasRepeatedChars(str) {
        return /(.)\1{4,}/.test(str); // Checks for 5 or more repeated characters
    }

    // Check for sequential numbers
    function hasSequentialNumbers(str) {
        const sequences = ['0123456789', '1234567890', '9876543210', '0987654321'];
        return sequences.some(seq => str.includes(seq));
    }

    // Check for common names
    function isCommonName(str) {
        const commonNames = [
            // Western names
            'john', 'mike', 'david', 'james', 'robert', 'mary', 'jane',
            'lisa', 'sarah', 'emma', 'olivia', 'sophia', 'isabella', 'mia',
            'charlotte', 'amelia', 'harper', 'evelyn', 'abigail', 'emily',
            'william', 'daniel', 'michael', 'alexander', 'jennifer', 'elizabeth',
            'sophia', 'emma', 'olivia', 'ava', 'isabella', 'mia', 'charlotte',
            'amelia', 'harper', 'evelyn', 'abigail', 'emily', 'elizabeth',
            
            // Indian names
            'rahul', 'priya', 'amit', 'neha', 'raj', 'anita', 'suresh',
            'deepak', 'kavita', 'sunil', 'meera', 'vijay', 'puja', 'rajesh',
            'anand', 'kiran', 'sanjay', 'divya', 'arun', 'pooja', 'vikram',
            'shweta', 'nitin', 'priyanka', 'sachin', 'anjali', 'manish',
            'ritu', 'sandeep', 'neha', 'amit', 'kavita', 'rajesh', 'pooja',
            'vijay', 'divya', 'sanjay', 'shweta', 'nitin', 'manish', 'ritu',
            'sandeep', 'deepak', 'meera', 'sunil', 'anand', 'kiran', 'arun',
            'vikram', 'priyanka', 'sachin', 'anjali', 'rahul', 'priya', 'raj',
            'anita', 'suresh', 'kavita', 'puja', 'rajesh', 'pooja', 'vijay',
            'divya', 'sanjay', 'shweta', 'nitin', 'manish', 'ritu', 'sandeep',
            
            // Common Indian name patterns
            'kumar', 'singh', 'patel', 'sharma', 'gupta', 'verma', 'yadav',
            'chopra', 'kapoor', 'reddy', 'nair', 'iyer', 'menon', 'nayak',
            'pandey', 'tiwari', 'mishra', 'chauhan', 'agarwal', 'malhotra',
            'bhat', 'joshi', 'mehta', 'trivedi', 'desai', 'shah', 'gandhi',
            'khan', 'ahmed', 'ali', 'hussain', 'khan', 'shaikh', 'patil',
            'naik', 'goud', 'rao', 'reddy', 'nayak', 'pandey', 'tiwari',
            'mishra', 'chauhan', 'agarwal', 'malhotra', 'bhat', 'joshi',
            'mehta', 'trivedi', 'desai', 'shah', 'gandhi', 'khan', 'ahmed',
            'ali', 'hussain', 'khan', 'shaikh', 'patil', 'naik', 'goud',
            'rao', 'reddy', 'nayak', 'pandey', 'tiwari', 'mishra', 'chauhan',
            'agarwal', 'malhotra', 'bhat', 'joshi', 'mehta', 'trivedi',
            'desai', 'shah', 'gandhi', 'khan', 'ahmed', 'ali', 'hussain',
            'khan', 'shaikh', 'patil', 'naik', 'goud', 'rao'
        ];

        // Convert to lowercase for case-insensitive comparison
        const lowerStr = str.toLowerCase();
        
        // Check for exact name matches
        if (commonNames.some(name => lowerStr === name)) {
            return true;
        }

        // Check for names with numbers (e.g., "rahul123", "priya456")
        if (commonNames.some(name => lowerStr.startsWith(name) && /\d/.test(lowerStr))) {
            return true;
        }

        // Check for names with common suffixes (e.g., "rahul123", "priya_123")
        const commonSuffixes = ['123', '456', '789', '000', '111', '222', '333', '444', '555', '666', '777', '888', '999'];
        if (commonNames.some(name => commonSuffixes.some(suffix => lowerStr === name + suffix))) {
            return true;
        }

        // Check for names with special characters (e.g., "rahul@123", "priya_123")
        if (commonNames.some(name => /[!@#$%^&*(),.?":{}|<>]/.test(lowerStr) && lowerStr.includes(name))) {
            return true;
        }

        return false;
    }

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });

    // Check password strength
    function checkPassword(password) {
        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        // Additional weak pattern checks
        const weakPatterns = {
            repeated: hasRepeatedChars(password),
            sequential: hasSequentialNumbers(password),
            commonPassword: commonPasswords.includes(password.toLowerCase()),
            commonName: isCommonName(password)
        };

        // Update requirement indicators
        Object.entries(checks).forEach(([key, value]) => {
            const requirement = requirements[key];
            requirement.textContent = requirement.textContent.replace(/[✅❌]/, value ? '✅' : '❌');
            requirement.className = `requirement ${value ? 'valid' : 'invalid'}`;
        });

        // Calculate strength
        const validChecks = Object.values(checks).filter(Boolean).length;
        let strength = 'weak';
        let strengthEmoji = '❌';
        let warningMessage = '';

        // Check for weak patterns
        if (weakPatterns.repeated) {
            warningMessage = 'Avoid repeated characters';
        } else if (weakPatterns.sequential) {
            warningMessage = 'Avoid sequential numbers';
        } else if (weakPatterns.commonPassword) {
            warningMessage = 'This is a common password';
        } else if (weakPatterns.commonName) {
            warningMessage = 'Avoid using names (including Indian names)';
        }

        // If any weak pattern is detected, force weak strength
        if (Object.values(weakPatterns).some(Boolean)) {
            strength = 'weak';
            strengthEmoji = '❌';
        } else if (validChecks >= 4) {
            strength = 'strong';
            strengthEmoji = '💪';
        } else if (validChecks >= 2) {
            strength = 'moderate';
            strengthEmoji = '😐';
        }

        // Update strength meter
        strengthLevel.className = 'strength-level ' + strength;
        strengthText.textContent = `${strengthEmoji} ${strength.charAt(0).toUpperCase() + strength.slice(1)}${warningMessage ? ' - ' + warningMessage : ''}`;
    }

    // Add input event listener
    passwordInput.addEventListener('input', (e) => {
        const password = e.target.value;
        if (password.length === 0) {
            strengthLevel.className = 'strength-level';
            strengthText.textContent = 'Not entered';
            Object.values(requirements).forEach(req => {
                req.textContent = req.textContent.replace(/[✅❌]/, '❌');
                req.className = 'requirement';
            });
        } else {
            checkPassword(password);
        }
    });
}); 