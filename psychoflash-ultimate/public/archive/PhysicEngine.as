class PhysicEngine {
	var speedX:Number = 0
	var speedY:Number = 0
	var speedMx:Number = 0;
	var speedMy:Number = 0;
	var ox:Number = 0;
	var oy:Number = 0;
	var nfriction:Number = 0;
	var Ypos:Number = 0;
	var Xpos:Number = 0;
	var friction:Number = 0.5;
	var gravity:Number = 9.8;
	var L_Xlimit:Number = 0;
	var R_Xlimit:Number = 550;
	var U_Ylimit:Number = 0;
	var D_Ylimit:Number = 400;
	var D_YlimitG:Number;
	var r:Number;
		var t:Number=0
			var x:Number=10
	var d:Number;
	var X:Number;
	var Y:Number;
	var elas:Number=0
	var speed:Number=0

	function change_speed(change_speedX:Number, change_speedY:Number) {
		if (change_speedX) {

			speedX += Number(change_speedX);


		}
		if (change_speedY) {



			speedY += Number(change_speedY);



		}
	}

	function physic(MCname:MovieClip, gravity, friction, L_Xlimit, R_Xlimit, U_Ylimit, D_Ylimit, drag, grab) {
		if (drag) {

			MCname._x = _root._xmouse;
			MCname._y = _root._ymouse;
			speedMx = ox-MCname._x;
			speedMy = oy-MCname._y;
			speedX = -speedMx/3;
			speedY = -speedMy*7;
			ox = MCname._x;
			oy = MCname._y;
		} else {

			nfriction = ground() ? friction : friction*1.3;
			speedX = (speedX*nfriction*1.96);//+(RD*1.5);
			speedY = speedY+gravity;
			//trace(Math.round(speedX)+", "+Math.round(speedY))
			Xpos = MCname._x+speedX;
			Ypos = MCname._y+speedY/10;
			if (Xpos<L_Xlimit+10) {
				Xpos = L_Xlimit+10;
				speedX = -(speedX*friction*1.8);
			}
			if (Xpos>R_Xlimit-10) {
				Xpos = R_Xlimit-10;
				speedX = -(speedX*friction*1.8);
			}
			if (Ypos<U_Ylimit) {
				Ypos = U_Ylimit;
				speedY = -(speedY*friction);
			}
			if (Ypos>D_Ylimit) {
				Ypos = D_Ylimit;
				speedY = -(speedY*friction);
			}
			
grab=0
			if (grab) {
				/*X = Math.sin(-d/57.5)*radius;
				Y = Math.cos(-d/57.5)*radius;
				_x = xp+X;
				_y = yp+Y;*/
				
				//d=Math.sqrt(Math.pow(MCname._x-grab.x,2)+Math.pow(MCname._y-grab.y,2));
				/*elas = 0.91;//9.000000E-001;
				speed = 0.105;//1.000000E-001;
				xD = 500;
				yD = 500;
				xp = 250;
				yp = 200;*/
				//onMouseDown=function(){
				//xD=_xmouse
				//yD=_ymouse
				//}

				//x = -w._x+xD;
				//y = -w._y+yD;
				//xp = xp*elas+x*speed;
				//yp = yp*elas+y*speed;
				//w._x = w._x+xp;
				//w._y= w._y+yp;

				//r = r*gravity;
				r=Math.atan2(MCname._y-grab._y,MCname._x-grab._x);
				elas=0.9
				//sx=
				t=-r+0
				speed = speed*elas+t*0.1//speedX*speedY*0.01;
				
				X= Math.sin(-speed/10);
				Y= Math.sin(speed/10);
				trace(X)
				MCname._x = MCname._x+X*20;
				MCname._y = MCname._y+Y*20;
				MCname._rotation = r*180/Math.PI;
			r=r+speed


			}else{
				
MCname._x = Xpos;
			MCname._y = Ypos;
			D_YlimitG = D_Ylimit;

			}
		}
	}
	function ground() {
		if (Ypos eq D_YlimitG) {
			return 1;
		} else {
			return 0;
		}
	}
}