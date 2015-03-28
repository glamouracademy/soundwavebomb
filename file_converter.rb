set :public_folder, 'public'

get '/' do
  redirect to('/index.html')
end

post '/download' do
  content_type('image/svg+xml')
  attachment('_______file.svg')
  params[:val]
end
