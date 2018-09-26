import javax.swing.JOptionPane;

public class letterCount {
    public static void main(String[] args) {
        
        // User input string.
        JOptionPane.showMessageDialog(null, "This program will find the number of letters in any statement.");
        String input = JOptionPane.showInputDialog("Enter a statement below: ");

        // Execute countLetter method.
        int letters = countLetter(input);

        // Display result to the user.
        JOptionPane.showMessageDialog(null, "Your statement has " + letters + " letters.");

    }

    static int countLetter(String input) {
        
        // Declare variables.
        int result = 0;
        
        // Loop to count every character.
        for (int index = 0; index < input.length(); index++) {
            
            // If the character is a letter, count it.
            if (Character.isLetter(input.charAt(index))) {
                result++;
            }

            // Otherwise, skip to the next character.

        }
        return result;
    }
}
