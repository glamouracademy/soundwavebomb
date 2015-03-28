set :public_folder, 'public'

post '/download' do
  content_type('image/svg+xml')
  attachment('file.svg')
  params[:val]
end
