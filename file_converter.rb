set :public_folder, 'public'

post '/download' do
  content_type('image/svg+xml')
  attachment('_______file.svg')
  params[:val]
end
