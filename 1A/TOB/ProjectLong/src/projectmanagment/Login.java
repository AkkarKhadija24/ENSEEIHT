package projectmanagment;

import java.awt.Color;
import java.awt.Container;
import java.awt.Cursor;
import java.awt.Font;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.UIDefaults;
import javax.swing.UIManager;
import javax.swing.border.MatteBorder;
import javax.swing.plaf.basic.BasicButtonUI;
import javax.swing.plaf.basic.BasicComboBoxUI;
import javax.swing.plaf.basic.BasicLabelUI;

import projectmanagment.DataBase;
import projectmanagment.Home;
import projectmanagment.Login;
import projectmanagment.ResetPass;


/**
 *
 * @author khadija
 */
public class Login extends javax.swing.JFrame {

    private int mouseX;
    private int mouseY;
    
    public Login() {
        initComponents();
        signUpP.setVisible(false);
        jLabel1.setVisible(false);
        mess.setVisible(false);
        JButton[] buttons1 = {returnToSignin, joinBtn};
        for(JButton btn : buttons1){
            btn.setCursor(new Cursor(Cursor.HAND_CURSOR));
            btn.setBackground(new Color(255, 255, 255));
            btn.setUI(new BasicButtonUI());
            btn.addMouseListener( new MouseListener(){
                    @Override
                    public void mouseClicked(MouseEvent e) {
                    }

                    @Override
                    public void mousePressed(MouseEvent e) {
                    }

                    @Override
                    public void mouseReleased(MouseEvent e) {
                    }

                    @Override
                    public void mouseEntered(MouseEvent e) {
                        btn.setBorder(new MatteBorder(0, 0, 1, 0, new Color(87, 72, 206)));
                        btn.setFont(new Font(Font.SANS_SERIF,  Font.BOLD, 15));
                    }

                    @Override
                    public void mouseExited(MouseEvent e) {
                        btn.setBorder(new MatteBorder(0, 0, 0, 0, new Color(87, 72, 206)));
                        btn.setFont(new Font(Font.SANS_SERIF,  Font.BOLD, 14));
                    }

                }

                );
        }
        
        
        cBCountry.setUI(new BasicComboBoxUI());
        cBCountry.setCursor(new Cursor(Cursor.HAND_CURSOR));
        cBCountry.setBackground(new Color(255,255,255));

        
        minimizeBtn.setUI(new BasicButtonUI());
        minimizeBtn.setCursor(new Cursor(Cursor.HAND_CURSOR));
        minimizeBtn.setBorder(new MatteBorder(0, 0, 0, 0, Color.white));
        minimizeBtn.addMouseListener( new MouseListener(){
            @Override
            public void mouseClicked(MouseEvent e) {
            }

            @Override
            public void mousePressed(MouseEvent e) {
            }

            @Override
            public void mouseReleased(MouseEvent e) {
            }

            @Override
            public void mouseEntered(MouseEvent e) {
                minimizeBtn.setForeground((new Color(40, 47, 57)));
            }

            @Override
            public void mouseExited(MouseEvent e) {
                minimizeBtn.setForeground((new Color(255,255,255)));
            }

        }
        );
        
        closeBtn.setUI(new BasicButtonUI());
        closeBtn.setCursor(new Cursor(Cursor.HAND_CURSOR));
        closeBtn.setBorder(new MatteBorder(0, 0, 0, 0, Color.white));
        closeBtn.addMouseListener( new MouseListener(){
            @Override
            public void mouseClicked(MouseEvent e) {
            }

            @Override
            public void mousePressed(MouseEvent e) {
            }

            @Override
            public void mouseReleased(MouseEvent e) {
            }

            @Override
            public void mouseEntered(MouseEvent e) {
                closeBtn.setForeground(Color.RED);
            }

            @Override
            public void mouseExited(MouseEvent e) {
                closeBtn.setForeground((new Color(255,255,255)));
            }

        }
        );
        
        
        
        JButton[] buttns = {signIn, signUp, signInWith, signUpWith};
        for (JButton btn : buttns) {
            btn.setUI(new BasicButtonUI());
            btn.setCursor(new Cursor(Cursor.HAND_CURSOR));
            btn.addMouseListener( new MouseListener(){
                @Override
                public void mouseClicked(MouseEvent e) {
                }

                @Override
                public void mousePressed(MouseEvent e) {
                }

                @Override
                public void mouseReleased(MouseEvent e) {
                }

                @Override
                public void mouseEntered(MouseEvent e) {
                    btn.setBackground((new Color(89, 74, 207)));
                }

                @Override
                public void mouseExited(MouseEvent e) {
                    btn.setBackground((new Color(95,80,255)));
                }
            
            }
            
            );
        }
        
        forgotPass.setCursor(new Cursor(Cursor.HAND_CURSOR));
        
}
    

    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        rootPanel = new javax.swing.JPanel();
        signUpP = new javax.swing.JPanel();
        jLabel6 = new javax.swing.JLabel();
        jLabel7 = new javax.swing.JLabel();
        lFullName = new javax.swing.JLabel();
        emailUp = new javax.swing.JTextField();
        lPassConf = new javax.swing.JLabel();
        signUp = new javax.swing.JButton();
        jPanel7 = new javax.swing.JPanel();
        jLabel17 = new javax.swing.JLabel();
        jPanel8 = new javax.swing.JPanel();
        signUpWith = new javax.swing.JButton();
        lPass = new javax.swing.JLabel();
        fullName = new javax.swing.JTextField();
        lEmail = new javax.swing.JLabel();
        cBCountry = new javax.swing.JComboBox<>();
        lCountry = new javax.swing.JLabel();
        aHaveAcount = new javax.swing.JLabel();
        returnToSignin = new javax.swing.JButton();
        passwordUp = new javax.swing.JPasswordField();
        confirmPass = new javax.swing.JPasswordField();
        mess = new javax.swing.JLabel();
        signInP = new javax.swing.JPanel();
        jLabel8 = new javax.swing.JLabel();
        jLabel9 = new javax.swing.JLabel();
        user_name_in = new javax.swing.JTextField();
        lEmailIn = new javax.swing.JLabel();
        lPassIn = new javax.swing.JLabel();
        signIn = new javax.swing.JButton();
        forgotPass = new javax.swing.JLabel();
        signInWith = new javax.swing.JButton();
        jPanel5 = new javax.swing.JPanel();
        jPanel6 = new javax.swing.JPanel();
        jLabel13 = new javax.swing.JLabel();
        newUser = new javax.swing.JLabel();
        joinBtn = new javax.swing.JButton();
        userPassword = new javax.swing.JPasswordField();
        jLabel1 = new javax.swing.JLabel();
        jPanel9 = new javax.swing.JPanel();
        minimizeBtn = new javax.swing.JButton();
        closeBtn = new javax.swing.JButton();
        jLabel23 = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setLocationByPlatform(true);
        setUndecorated(true);
        setPreferredSize(new java.awt.Dimension(1077, 640));

        rootPanel.setBackground(new java.awt.Color(87, 78, 213));
        rootPanel.setMinimumSize(new java.awt.Dimension(1077, 640));
        rootPanel.setPreferredSize(new java.awt.Dimension(100, 640));
        rootPanel.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        signUpP.setBackground(new java.awt.Color(255, 255, 255));
        signUpP.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        jLabel6.setFont(new java.awt.Font("SansSerif", 1, 36)); // NOI18N
        jLabel6.setForeground(new java.awt.Color(87, 72, 206));
        jLabel6.setText("Sign up");
        signUpP.add(jLabel6, new org.netbeans.lib.awtextra.AbsoluteConstraints(37, 35, -1, -1));

        jLabel7.setFont(new java.awt.Font("SansSerif", 0, 14)); // NOI18N
        jLabel7.setForeground(new java.awt.Color(153, 153, 255));
        jLabel7.setText("Make more effective of your projects");
        signUpP.add(jLabel7, new org.netbeans.lib.awtextra.AbsoluteConstraints(40, 90, -1, -1));

        lFullName.setFont(new java.awt.Font("SansSerif", 0, 12)); // NOI18N
        lFullName.setForeground(new java.awt.Color(87, 72, 206));
        lFullName.setText("Full name *");
        signUpP.add(lFullName, new org.netbeans.lib.awtextra.AbsoluteConstraints(40, 130, -1, 20));

        emailUp.setFont(new java.awt.Font("SansSerif", 0, 14)); // NOI18N
        emailUp.setForeground(new java.awt.Color(40, 47, 57));
        emailUp.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 2, 0, new java.awt.Color(87, 72, 206)));
        emailUp.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                emailUpMouseClicked(evt);
            }
        });
        emailUp.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                emailUpActionPerformed(evt);
            }
        });
        signUpP.add(emailUp, new org.netbeans.lib.awtextra.AbsoluteConstraints(40, 250, 385, 47));

        lPassConf.setFont(new java.awt.Font("SansSerif", 0, 12)); // NOI18N
        lPassConf.setForeground(new java.awt.Color(87, 72, 206));
        lPassConf.setText("Confirm password *");
        signUpP.add(lPassConf, new org.netbeans.lib.awtextra.AbsoluteConstraints(540, 226, -1, 30));

        signUp.setBackground(new java.awt.Color(95, 80, 255));
        signUp.setFont(new java.awt.Font("SansSerif", 1, 14)); // NOI18N
        signUp.setForeground(new java.awt.Color(255, 255, 255));
        signUp.setText("Sign up");
        signUp.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 0, 0, new java.awt.Color(29, 103, 252)));
        signUp.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                signUpMouseClicked(evt);
            }
        });
        signUp.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                signUpActionPerformed(evt);
            }
        });
        signUpP.add(signUp, new org.netbeans.lib.awtextra.AbsoluteConstraints(540, 330, 385, 40));

        jPanel7.setBackground(new java.awt.Color(153, 153, 153));
        jPanel7.setPreferredSize(new java.awt.Dimension(175, 1));

        javax.swing.GroupLayout jPanel7Layout = new javax.swing.GroupLayout(jPanel7);
        jPanel7.setLayout(jPanel7Layout);
        jPanel7Layout.setHorizontalGroup(
            jPanel7Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 175, Short.MAX_VALUE)
        );
        jPanel7Layout.setVerticalGroup(
            jPanel7Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 1, Short.MAX_VALUE)
        );

        signUpP.add(jPanel7, new org.netbeans.lib.awtextra.AbsoluteConstraints(540, 390, -1, -1));

        jLabel17.setForeground(new java.awt.Color(153, 153, 255));
        jLabel17.setText("or");
        signUpP.add(jLabel17, new org.netbeans.lib.awtextra.AbsoluteConstraints(730, 380, -1, -1));

        jPanel8.setBackground(new java.awt.Color(153, 153, 153));
        jPanel8.setPreferredSize(new java.awt.Dimension(175, 1));

        javax.swing.GroupLayout jPanel8Layout = new javax.swing.GroupLayout(jPanel8);
        jPanel8.setLayout(jPanel8Layout);
        jPanel8Layout.setHorizontalGroup(
            jPanel8Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 175, Short.MAX_VALUE)
        );
        jPanel8Layout.setVerticalGroup(
            jPanel8Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 1, Short.MAX_VALUE)
        );

        signUpP.add(jPanel8, new org.netbeans.lib.awtextra.AbsoluteConstraints(750, 390, -1, -1));

        signUpWith.setBackground(new java.awt.Color(95, 80, 255));
        signUpWith.setFont(new java.awt.Font("SansSerif", 1, 14)); // NOI18N
        signUpWith.setForeground(new java.awt.Color(255, 255, 255));
        signUpWith.setText("Sign up with google account");
        signUpWith.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 0, 0, new java.awt.Color(29, 103, 252)));
        signUpP.add(signUpWith, new org.netbeans.lib.awtextra.AbsoluteConstraints(540, 410, 385, 40));

        lPass.setFont(new java.awt.Font("SansSerif", 0, 12)); // NOI18N
        lPass.setForeground(new java.awt.Color(87, 72, 206));
        lPass.setText("Password *");
        signUpP.add(lPass, new org.netbeans.lib.awtextra.AbsoluteConstraints(540, 120, -1, 40));

        fullName.setFont(new java.awt.Font("SansSerif", 0, 14)); // NOI18N
        fullName.setForeground(new java.awt.Color(40, 47, 57));
        fullName.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 2, 0, new java.awt.Color(87, 72, 206)));
        fullName.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                fullNameMouseClicked(evt);
            }
        });
        fullName.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                fullNameActionPerformed(evt);
            }
        });
        signUpP.add(fullName, new org.netbeans.lib.awtextra.AbsoluteConstraints(40, 150, 385, 47));

        lEmail.setFont(new java.awt.Font("SansSerif", 0, 12)); // NOI18N
        lEmail.setForeground(new java.awt.Color(87, 72, 206));
        lEmail.setText("Email address *");
        signUpP.add(lEmail, new org.netbeans.lib.awtextra.AbsoluteConstraints(40, 220, -1, 40));

        cBCountry.setFont(new java.awt.Font("SansSerif", 0, 14)); // NOI18N
        cBCountry.setForeground(new java.awt.Color(40, 47, 57));
        cBCountry.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Maroc", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Channel Islands", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "DR Congo", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Faeroe Islands", "Finland", "France", "French Guiana", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Réunion", "Romania", "Russia", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "San Marino", "Sao Tome & Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "State of Palestine", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "The Bahamas", "Timor-Leste", "Togo", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Western Sahara", "Yemen", "Zambia", "Zimbabwe" }));
        cBCountry.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 2, 0, new java.awt.Color(87, 72, 206)));
        cBCountry.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                cBCountryMouseClicked(evt);
            }
        });
        cBCountry.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                cBCountryActionPerformed(evt);
            }
        });
        signUpP.add(cBCountry, new org.netbeans.lib.awtextra.AbsoluteConstraints(40, 350, 385, 40));

        lCountry.setFont(new java.awt.Font("SansSerif", 0, 12)); // NOI18N
        lCountry.setForeground(new java.awt.Color(87, 72, 206));
        lCountry.setText("Country *");
        signUpP.add(lCountry, new org.netbeans.lib.awtextra.AbsoluteConstraints(40, 316, -1, 30));

        aHaveAcount.setFont(new java.awt.Font("SansSerif", 0, 14)); // NOI18N
        aHaveAcount.setForeground(new java.awt.Color(142, 84, 247));
        aHaveAcount.setText("Already on project management?");
        aHaveAcount.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                aHaveAcountMouseClicked(evt);
            }
        });
        signUpP.add(aHaveAcount, new org.netbeans.lib.awtextra.AbsoluteConstraints(590, 470, -1, -1));

        returnToSignin.setFont(new java.awt.Font("SansSerif", 1, 14)); // NOI18N
        returnToSignin.setForeground(new java.awt.Color(87, 72, 206));
        returnToSignin.setText("Sign in");
        returnToSignin.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 0, 0, new java.awt.Color(87, 72, 206)));
        returnToSignin.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                returnToSigninMouseClicked(evt);
            }
        });
        returnToSignin.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                returnToSigninActionPerformed(evt);
            }
        });
        signUpP.add(returnToSignin, new org.netbeans.lib.awtextra.AbsoluteConstraints(810, 470, -1, -1));

        passwordUp.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 2, 0, new java.awt.Color(87, 72, 206)));
        passwordUp.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                passwordUpMouseClicked(evt);
            }
        });
        signUpP.add(passwordUp, new org.netbeans.lib.awtextra.AbsoluteConstraints(540, 150, 385, 47));

        confirmPass.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 2, 0, new java.awt.Color(87, 72, 206)));
        confirmPass.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                confirmPassMouseClicked(evt);
            }
        });
        signUpP.add(confirmPass, new org.netbeans.lib.awtextra.AbsoluteConstraints(540, 250, 385, 47));

        mess.setFont(new java.awt.Font("SansSerif", 1, 12)); // NOI18N
        mess.setForeground(new java.awt.Color(255, 0, 0));
        mess.setText("This email is already exist");
        signUpP.add(mess, new org.netbeans.lib.awtextra.AbsoluteConstraints(140, 230, 150, 20));

        rootPanel.add(signUpP, new org.netbeans.lib.awtextra.AbsoluteConstraints(60, 60, 970, 520));

        signInP.setBackground(new java.awt.Color(255, 255, 255));

        jLabel8.setFont(new java.awt.Font("SansSerif", 1, 36)); // NOI18N
        jLabel8.setForeground(new java.awt.Color(87, 72, 206));
        jLabel8.setText("Sign in");

        jLabel9.setFont(new java.awt.Font("SansSerif", 0, 14)); // NOI18N
        jLabel9.setForeground(new java.awt.Color(153, 153, 255));
        jLabel9.setText("Manage your project with your teams");

        user_name_in.setFont(new java.awt.Font("SansSerif", 0, 14)); // NOI18N
        user_name_in.setForeground(new java.awt.Color(40, 47, 57));
        user_name_in.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 2, 0, new java.awt.Color(87, 72, 206)));
        user_name_in.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                user_name_inMouseClicked(evt);
            }
        });
        user_name_in.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                user_name_inActionPerformed(evt);
            }
        });

        lEmailIn.setFont(new java.awt.Font("SansSerif", 0, 12)); // NOI18N
        lEmailIn.setForeground(new java.awt.Color(87, 72, 206));
        lEmailIn.setText("Email *");

        lPassIn.setFont(new java.awt.Font("SansSerif", 0, 12)); // NOI18N
        lPassIn.setForeground(new java.awt.Color(87, 72, 206));
        lPassIn.setText("Password *");

        signIn.setBackground(new java.awt.Color(95, 80, 255));
        signIn.setFont(new java.awt.Font("SansSerif", 1, 14)); // NOI18N
        signIn.setForeground(new java.awt.Color(255, 255, 255));
        signIn.setText("Sign in");
        signIn.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 0, 0, new java.awt.Color(29, 103, 252)));
        signIn.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                signInMouseClicked(evt);
            }
        });
        signIn.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                signInActionPerformed(evt);
            }
        });

        forgotPass.setFont(new java.awt.Font("SansSerif", 1, 12)); // NOI18N
        forgotPass.setForeground(new java.awt.Color(87, 72, 206));
        forgotPass.setText("Forgot password?");
        forgotPass.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                forgotPassMouseClicked(evt);
            }
        });

        signInWith.setBackground(new java.awt.Color(95, 80, 255));
        signInWith.setFont(new java.awt.Font("SansSerif", 1, 14)); // NOI18N
        signInWith.setForeground(new java.awt.Color(255, 255, 255));
        signInWith.setText("Sign in with google account");
        signInWith.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 0, 0, new java.awt.Color(29, 103, 252)));

        jPanel5.setBackground(new java.awt.Color(153, 153, 153));
        jPanel5.setPreferredSize(new java.awt.Dimension(175, 1));

        javax.swing.GroupLayout jPanel5Layout = new javax.swing.GroupLayout(jPanel5);
        jPanel5.setLayout(jPanel5Layout);
        jPanel5Layout.setHorizontalGroup(
            jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 175, Short.MAX_VALUE)
        );
        jPanel5Layout.setVerticalGroup(
            jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 1, Short.MAX_VALUE)
        );

        jPanel6.setBackground(new java.awt.Color(153, 153, 153));
        jPanel6.setPreferredSize(new java.awt.Dimension(175, 1));

        javax.swing.GroupLayout jPanel6Layout = new javax.swing.GroupLayout(jPanel6);
        jPanel6.setLayout(jPanel6Layout);
        jPanel6Layout.setHorizontalGroup(
            jPanel6Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 175, Short.MAX_VALUE)
        );
        jPanel6Layout.setVerticalGroup(
            jPanel6Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 1, Short.MAX_VALUE)
        );

        jLabel13.setForeground(new java.awt.Color(153, 153, 255));
        jLabel13.setText("or");

        newUser.setFont(new java.awt.Font("SansSerif", 0, 14)); // NOI18N
        newUser.setForeground(new java.awt.Color(142, 84, 247));
        newUser.setText("New to project management?");

        joinBtn.setFont(new java.awt.Font("SansSerif", 1, 14)); // NOI18N
        joinBtn.setForeground(new java.awt.Color(87, 72, 206));
        joinBtn.setText("Join now");
        joinBtn.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 0, 0, new java.awt.Color(87, 72, 206)));
        joinBtn.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                joinBtnMouseClicked(evt);
            }
        });
        joinBtn.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                joinBtnActionPerformed(evt);
            }
        });

        userPassword.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 2, 0, new java.awt.Color(87, 72, 206)));
        userPassword.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                userPasswordMouseClicked(evt);
            }
        });

        jLabel1.setFont(new java.awt.Font("SansSerif", 0, 12)); // NOI18N
        jLabel1.setForeground(new java.awt.Color(255, 0, 0));
        jLabel1.setText("This field is required");

        javax.swing.GroupLayout signInPLayout = new javax.swing.GroupLayout(signInP);
        signInP.setLayout(signInPLayout);
        signInPLayout.setHorizontalGroup(
            signInPLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(signInPLayout.createSequentialGroup()
                .addGroup(signInPLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(signInPLayout.createSequentialGroup()
                        .addGap(37, 37, 37)
                        .addGroup(signInPLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jLabel8)
                            .addComponent(jLabel9)
                            .addGroup(signInPLayout.createSequentialGroup()
                                .addComponent(lEmailIn)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(jLabel1))
                            .addComponent(user_name_in, javax.swing.GroupLayout.PREFERRED_SIZE, 385, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(lPassIn)
                            .addComponent(forgotPass, javax.swing.GroupLayout.PREFERRED_SIZE, 138, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(signIn, javax.swing.GroupLayout.PREFERRED_SIZE, 385, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addGroup(signInPLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                                .addGroup(signInPLayout.createSequentialGroup()
                                    .addComponent(jPanel6, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                    .addComponent(jLabel13)
                                    .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                    .addComponent(jPanel5, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addComponent(signInWith, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.PREFERRED_SIZE, 385, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addComponent(userPassword, javax.swing.GroupLayout.PREFERRED_SIZE, 385, javax.swing.GroupLayout.PREFERRED_SIZE)))
                    .addGroup(signInPLayout.createSequentialGroup()
                        .addGap(88, 88, 88)
                        .addComponent(newUser)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(joinBtn)))
                .addGap(75, 75, 75))
        );
        signInPLayout.setVerticalGroup(
            signInPLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(signInPLayout.createSequentialGroup()
                .addGap(35, 35, 35)
                .addComponent(jLabel8)
                .addGap(6, 6, 6)
                .addComponent(jLabel9)
                .addGap(33, 33, 33)
                .addGroup(signInPLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(lEmailIn)
                    .addComponent(jLabel1))
                .addComponent(user_name_in, javax.swing.GroupLayout.PREFERRED_SIZE, 47, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(30, 30, 30)
                .addComponent(lPassIn)
                .addGap(0, 0, 0)
                .addComponent(userPassword, javax.swing.GroupLayout.PREFERRED_SIZE, 47, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(forgotPass)
                .addGap(25, 25, 25)
                .addComponent(signIn, javax.swing.GroupLayout.PREFERRED_SIZE, 40, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(signInPLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addGroup(signInPLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addComponent(jPanel6, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addComponent(jPanel5, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addComponent(jLabel13))
                .addGap(18, 18, 18)
                .addComponent(signInWith, javax.swing.GroupLayout.PREFERRED_SIZE, 40, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addGroup(signInPLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(newUser)
                    .addComponent(joinBtn))
                .addContainerGap(20, Short.MAX_VALUE))
        );

        rootPanel.add(signInP, new org.netbeans.lib.awtextra.AbsoluteConstraints(560, 60, 460, 520));

        jPanel9.setOpaque(false);
        jPanel9.addMouseMotionListener(new java.awt.event.MouseMotionAdapter() {
            public void mouseDragged(java.awt.event.MouseEvent evt) {
                jPanel9MouseDragged(evt);
            }
        });
        jPanel9.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mousePressed(java.awt.event.MouseEvent evt) {
                jPanel9MousePressed(evt);
            }
        });
        jPanel9.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        minimizeBtn.setBackground(new java.awt.Color(87, 78, 213));
        minimizeBtn.setFont(new java.awt.Font("SansSerif", 1, 18)); // NOI18N
        minimizeBtn.setForeground(new java.awt.Color(255, 255, 255));
        minimizeBtn.setText("_");
        minimizeBtn.setBorder(null);
        minimizeBtn.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                minimizeBtnActionPerformed(evt);
            }
        });
        jPanel9.add(minimizeBtn, new org.netbeans.lib.awtextra.AbsoluteConstraints(1015, 9, 20, -1));

        closeBtn.setBackground(new java.awt.Color(87, 78, 213));
        closeBtn.setFont(new java.awt.Font("SansSerif", 1, 18)); // NOI18N
        closeBtn.setForeground(new java.awt.Color(255, 255, 255));
        closeBtn.setText("X");
        closeBtn.setBorder(null);
        closeBtn.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                closeBtnActionPerformed(evt);
            }
        });
        jPanel9.add(closeBtn, new org.netbeans.lib.awtextra.AbsoluteConstraints(1045, 12, 20, -1));

        rootPanel.add(jPanel9, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 0, 1077, 60));

        jLabel23.setBackground(new java.awt.Color(255, 255, 255));
        jLabel23.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/pngegg.png"))); // NOI18N
        rootPanel.add(jLabel23, new org.netbeans.lib.awtextra.AbsoluteConstraints(130, 170, -1, -1));

        getContentPane().add(rootPanel, java.awt.BorderLayout.CENTER);

        pack();
        setLocationRelativeTo(null);
    }// </editor-fold>//GEN-END:initComponents

    private void emailUpActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_emailUpActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_emailUpActionPerformed

    private void fullNameActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_fullNameActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_fullNameActionPerformed

    private void cBCountryActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_cBCountryActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_cBCountryActionPerformed

    private void aHaveAcountMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_aHaveAcountMouseClicked
        // TODO add your handling code here:
        signUpP.setVisible(false);
        signInP.setVisible(true);
    }//GEN-LAST:event_aHaveAcountMouseClicked

    private void returnToSigninMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_returnToSigninMouseClicked
        // TODO add your handling code here:
    }//GEN-LAST:event_returnToSigninMouseClicked

    private void returnToSigninActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_returnToSigninActionPerformed
        // TODO add your handling code here:
        signUpP.setVisible(false);
        signInP.setVisible(true);
    }//GEN-LAST:event_returnToSigninActionPerformed

    private void user_name_inMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_user_name_inMouseClicked
        lEmailIn.setForeground(new Color(87,72,206));
        jLabel1.setVisible(false);
    }//GEN-LAST:event_user_name_inMouseClicked

    private void user_name_inActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_user_name_inActionPerformed

    }//GEN-LAST:event_user_name_inActionPerformed

    private void forgotPassMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_forgotPassMouseClicked

        if(user_name_in.getText().isEmpty()){
            lEmailIn.setForeground(Color.red);
            jLabel1.setVisible(true);
        }else{
            this.setVisible(false);
            ResetPass fp = new ResetPass();
            fp.setVisible(true);
        }
    }//GEN-LAST:event_forgotPassMouseClicked

    private void joinBtnMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_joinBtnMouseClicked

    }//GEN-LAST:event_joinBtnMouseClicked

    private void joinBtnActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_joinBtnActionPerformed
        // TODO add your handling code here:
        signInP.setVisible(false);
        signUpP.setVisible(true);
    }//GEN-LAST:event_joinBtnActionPerformed

    private void minimizeBtnActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_minimizeBtnActionPerformed
        this.setState(Login.ICONIFIED);
    }//GEN-LAST:event_minimizeBtnActionPerformed

    private void closeBtnActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_closeBtnActionPerformed
        // TODO add your handling code here:
        dispose();
    }//GEN-LAST:event_closeBtnActionPerformed

    private void jPanel9MouseDragged(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_jPanel9MouseDragged
        this.setLocation(this.getX() + evt.getX() - this.mouseX, this.getY() + evt.getY() - this.mouseY);
    }//GEN-LAST:event_jPanel9MouseDragged

    private void jPanel9MousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_jPanel9MousePressed
        mouseX = evt.getX();
        mouseY = evt.getY();
    }//GEN-LAST:event_jPanel9MousePressed

    private void signInActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_signInActionPerformed
        String user_name = user_name_in.getText();
        String pass = userPassword.getText();
        DataBase data = new DataBase();
        boolean enter = false;
        try {
            data.fillList(data.getUserDb());
        } catch (IOException ex) {
            Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        if (user_name.isEmpty()){
           lEmailIn.setForeground(Color.red);
        }
        if (pass.isEmpty()){
           lPassIn.setForeground(Color.red);
        }
        
        if (!"".equals(user_name) && !"".equals(pass)){
            for (DataBase u : data.getListOfUser()) {
                if(u.getEmail().equals(user_name)  & u.getPass().equals(pass)){
                    Home home = new Home();
                    home.setVisible(true);
                    this.setVisible(false);
                    System.out.println(u.getEmail());
                    enter = true;
                    break;
                } 
            }
            if (!enter) {
                lPassIn.setForeground(Color.red);
                lEmailIn.setForeground(Color.red);
            }   
        } 
        data.getListOfUser().clear();
    }//GEN-LAST:event_signInActionPerformed

    private void signUpActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_signUpActionPerformed
        
        String fName = fullName.getText();
        String email = emailUp.getText();
        String country = cBCountry.getSelectedItem().toString();
        String pass = passwordUp.getText();
        String passConfirm = confirmPass.getText();
        DataBase data = new DataBase();
        boolean exist = false;
        try {
            data.fillList(data.getUserDb());
        } catch (IOException ex) {
            Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
        }
        if(fName.isEmpty()){
            lFullName.setForeground(Color.red);
        }
        if(email.isEmpty()){
            lEmail.setForeground(Color.red);
        } 
        if(pass.isEmpty()){
             lPass.setForeground(Color.red);
        }
        if (passConfirm.isEmpty()){
            lPassConf.setForeground(Color.red);
        }
        if (country.isEmpty()){
            lCountry.setForeground(Color.red);
        }
        if (!pass.equals(passConfirm)){
            lPassConf.setForeground(Color.red);
            lPass.setForeground(Color.red);
            exist = true;
        }
        if(!fName.isEmpty() && !email.isEmpty() && !country.isEmpty() && !pass.isEmpty() && !passConfirm.isEmpty()){
            for (DataBase u : data.getListOfUser()) {
                if(u.getEmail().equals(email)){
                    mess.setVisible(true);
                    exist = true;
                    break;
                }
            }
            
            if (!exist) {
                try {
                    data.addUserToFile(email, fName, country, pass);
                    data.newLine();
                } catch (IOException ex) {
                    Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
                }
                Home home = new Home();
                home.setVisible(true);
                this.setVisible(false);
            }
        }
        data.getListOfUser().clear();
    }//GEN-LAST:event_signUpActionPerformed

    private void userPasswordMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_userPasswordMouseClicked
        lPassIn.setForeground(new Color(87,72,206));
    }//GEN-LAST:event_userPasswordMouseClicked

    private void fullNameMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_fullNameMouseClicked
        lFullName.setForeground(new Color(87,72,206));
    }//GEN-LAST:event_fullNameMouseClicked

    private void emailUpMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_emailUpMouseClicked
        lEmail.setForeground(new Color(87,72,206));
    }//GEN-LAST:event_emailUpMouseClicked

    private void cBCountryMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_cBCountryMouseClicked
        lCountry.setForeground(new Color(87,72,206));
    }//GEN-LAST:event_cBCountryMouseClicked

    private void passwordUpMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_passwordUpMouseClicked
        lPass.setForeground(new Color(87,72,206));
    }//GEN-LAST:event_passwordUpMouseClicked

    private void confirmPassMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_confirmPassMouseClicked
        lPassConf.setForeground(new Color(87,72,206));
    }//GEN-LAST:event_confirmPassMouseClicked

    private void signUpMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_signUpMouseClicked
        
    }//GEN-LAST:event_signUpMouseClicked

    private void signInMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_signInMouseClicked
        
    }//GEN-LAST:event_signInMouseClicked

    
    public static void main(String args[]) {
        
        java.awt.EventQueue.invokeLater(new Runnable(){
            public void run() {
                new Login().setVisible(true);
            }
        });
    }
    
    
    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JLabel aHaveAcount;
    private javax.swing.JComboBox<String> cBCountry;
    private javax.swing.JButton closeBtn;
    private javax.swing.JPasswordField confirmPass;
    private javax.swing.JTextField emailUp;
    private javax.swing.JLabel forgotPass;
    private javax.swing.JTextField fullName;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel13;
    private javax.swing.JLabel jLabel17;
    private javax.swing.JLabel jLabel23;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JLabel jLabel8;
    private javax.swing.JLabel jLabel9;
    private javax.swing.JPanel jPanel5;
    private javax.swing.JPanel jPanel6;
    private javax.swing.JPanel jPanel7;
    private javax.swing.JPanel jPanel8;
    private javax.swing.JPanel jPanel9;
    private javax.swing.JButton joinBtn;
    private javax.swing.JLabel lCountry;
    private javax.swing.JLabel lEmail;
    private javax.swing.JLabel lEmailIn;
    private javax.swing.JLabel lFullName;
    private javax.swing.JLabel lPass;
    private javax.swing.JLabel lPassConf;
    private javax.swing.JLabel lPassIn;
    private javax.swing.JLabel mess;
    private javax.swing.JButton minimizeBtn;
    private javax.swing.JLabel newUser;
    private javax.swing.JPasswordField passwordUp;
    private javax.swing.JButton returnToSignin;
    private javax.swing.JPanel rootPanel;
    private javax.swing.JButton signIn;
    private javax.swing.JPanel signInP;
    private javax.swing.JButton signInWith;
    private javax.swing.JButton signUp;
    private javax.swing.JPanel signUpP;
    private javax.swing.JButton signUpWith;
    private javax.swing.JPasswordField userPassword;
    private javax.swing.JTextField user_name_in;
    // End of variables declaration//GEN-END:variables
}