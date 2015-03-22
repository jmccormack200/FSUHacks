#define potPin 0
int potVal = 0;
#include <LiquidCrystal.h>

LiquidCrystal lcd(7, 8, 9, 10, 11, 12);

int potMin = 0;
int potMax = 1021;
int count = 0; 
int startPoint = 0;
int point = 0;
int previousRange = -1;
int nodePin = 4;
int pinValue = 0;
int hot = 5;
int ground1 = 4;
int ground2 = 6;
int test = 0;

void setup() {
  Serial.begin(9600);
  pinMode(potPin, INPUT);
  lcd.begin(16, 2);
  pinMode(nodePin, INPUT);
  pinMode(hot, OUTPUT);
  pinMode(ground1, OUTPUT);
  pinMode(ground2, OUTPUT);
  digitalWrite(hot, HIGH);
  digitalWrite(ground1, LOW);
  digitalWrite(ground2, HIGH);
  
}

void loop() {
  // put your main code here, to run repeatedly:
  int potVal = analogRead(potPin);
  int range = map(potVal, potMin, potMax, 0, 9);
  
   
  
  
    if (previousRange != range){
      /*
      if (test == 1){
       digitalWrite(ground1, LOW);
       digitalWrite(ground2, HIGH);
        test = 0; 
      } else{
        digitalWrite(ground1, HIGH);
        digitalWrite(ground2, LOW);
        test = 1;
      }
      */
      //Serial.print(count);
      if (count >= 3){
        lcd.clear();
        count = 0;
        switch (range) {
          case 0:
            Serial.print("\r\n0");
            lcd.setCursor(0,0);
            lcd.print("[]---------------");
            lcd.setCursor(0,1);
            lcd.print("1920s");
            digitalWrite(ground1, LOW);
            digitalWrite(ground2, HIGH);            
            break;
          case 1:
            Serial.print("\r\n1");
            lcd.setCursor(0,0);
            lcd.print("--[]------------");
            lcd.setCursor(0,1);
            lcd.print("1930s");
            digitalWrite(ground1, HIGH);
            digitalWrite(ground2, LOW);
            break;
          case 2:
            Serial.print("\r\n2");
            lcd.setCursor(0,0);
            lcd.print("----[]----------");
            lcd.setCursor(0,1);
            lcd.print("1940s");
            digitalWrite(ground1, LOW);
            digitalWrite(ground2, HIGH);
            break;
          case 3:
            Serial.print("\r\n3");
            lcd.setCursor(0,0);
            lcd.print("------[]--------");
            lcd.setCursor(0,1);
            lcd.print("1950s");
            digitalWrite(ground1, HIGH);
            digitalWrite(ground2, LOW);
            break;
          case 4:
            Serial.print("\r\n4");
            lcd.setCursor(0,0);
            lcd.print("--------[]------");
            lcd.setCursor(0,1);
            lcd.print("1960s");
            digitalWrite(ground1, LOW);
            digitalWrite(ground2, HIGH);
            break;
          case 5:
            Serial.print("\r\n5");
            lcd.setCursor(0,0);
            lcd.print("----------[]----");
            lcd.setCursor(0,1);
            lcd.print("1970s");
            digitalWrite(ground1, HIGH);
            digitalWrite(ground2, LOW);
            break;
          case 6:
            Serial.print("\r\n6");
            lcd.setCursor(0,0);
            lcd.print("------------[]--");
            lcd.setCursor(0,1);
            lcd.print("1980s");
            digitalWrite(ground1, LOW);
            digitalWrite(ground2, HIGH);
            break;
          case 7:
            Serial.print("\r\n7");
            lcd.setCursor(0,0);
            lcd.print("--------------[]");
            lcd.setCursor(0,1);
            lcd.print("1990z");
            digitalWrite(ground1, HIGH);
            digitalWrite(ground2, LOW);
            break;
          case 8:
            Serial.print("\r\n8");
            lcd.setCursor(0,0);
            lcd.print("----------------[");
            lcd.setCursor(0,1);
            lcd.print("2000s");
            digitalWrite(ground1, LOW);
            digitalWrite(ground2, HIGH);
            break;
          case 9:
            Serial.print("\r\n9");
            lcd.setCursor(0,0);
            lcd.print("---------------|");
            lcd.setCursor(0,1);
            lcd.print("2010s");
            digitalWrite(ground1, HIGH);
            digitalWrite(ground2, LOW);            
            break;
         previousRange = range;
        }
      }
    count++;
    }
    


  // delay at the end of the full loop:
   delay(250); 
}
