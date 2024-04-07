paru -S --noconfirm --needed cloudflared
sudo su
cloudflared login
cloudflared tunnel create plygrnd_lab --hostname plygrnd.land

# rm -rf /root/.cloudflared
# cp -r /home/keinsell/.cloudflared /root/.cloudflared