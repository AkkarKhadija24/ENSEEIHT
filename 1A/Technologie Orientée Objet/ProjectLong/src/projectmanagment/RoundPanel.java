/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/GUIForms/JPanel.java to edit this template
 */
package projectmanagment;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.RoundRectangle2D;

/**
 *
 * @author khadija
 */
public class RoundPanel extends javax.swing.JPanel {

    public RoundPanel() {
        initComponents();
        setOpaque(false);
    }

    @Override
    protected void paintComponent(Graphics grp){
        super.paintComponent(grp);
        Graphics2D graph2d = (Graphics2D) grp.create();
        graph2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        graph2d.setColor(getBackground());
        graph2d.fill(new RoundRectangle2D.Double(0, 0, getWidth(), getHeight(), 20, 20));
        graph2d.dispose();
    }
    
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        setBackground(new java.awt.Color(244, 244, 244));
        setBorder(javax.swing.BorderFactory.createEmptyBorder(30, 30, 30, 30));
        setForeground(new java.awt.Color(255, 255, 255));
        setPreferredSize(new java.awt.Dimension(385, 250));

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 217, Short.MAX_VALUE)
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 71, Short.MAX_VALUE)
        );
    }// </editor-fold>//GEN-END:initComponents


    // Variables declaration - do not modify//GEN-BEGIN:variables
    // End of variables declaration//GEN-END:variables
}
