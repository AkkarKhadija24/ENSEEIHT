/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package projectmanagment;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.RoundRectangle2D;
import javax.swing.JTextField;
import javax.swing.border.MatteBorder;
import javax.swing.plaf.basic.BasicTextFieldUI;

/**
 *
 * @author khadija
 */
public class Search extends JTextField {
    
    public Search(){
        setOpaque(false);
        setUI(new BasicTextFieldUI());
        setBorder(new MatteBorder(0, 0, 2, 0, new Color(40, 47, 57)));
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
    
}
