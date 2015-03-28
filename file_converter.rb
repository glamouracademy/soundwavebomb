set :public_folder, 'public'

get '/' do
  redirect to('/index.html')
end

post '/download' do
  content_type('image/svg+xml')
  attachment('akoustos.svg')
  params[:val]
end
