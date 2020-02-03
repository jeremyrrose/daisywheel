import Api from './ApiConfig'
import Axios from 'axios'
// const apiKey = `api_key=${TMDB_API_KEY}`

// configuration methods
export const getMagazine = async () => {
  try {
    const resp = await Api.get(`/magazines/1`);
    console.log(resp.data)
    let magazine = resp.data.magazine;
    magazine.sections = resp.data.sections;
    magazine.pages = resp.data.pages;
    return magazine;
  } catch(error) {
    console.error(error)
  }
}

export const updateMagazine = async (magData) => {
  console.log('halp2')
  try {
    const resp = await Api.put(`/edit/magazines/1`, magData)
    return resp;
  } catch (error) {
    throw error
  }
}

// single-article methods
export const getArticle = async (id) => {
  try {
    const resp = await Api.get(`/edit/articles/${id}`)
    console.log(resp)
    return resp.data
  } catch (error) {
    throw error
  }
}

export const createArticle = async (articleData) => {
  try {
      if (articleData.section_id == 0) { 
        delete articleData.section_id; 
        articleData.static_page = true 
      } else {
        articleData.static_page = false
      }
      if (articleData.author_id == 0) { 
        delete articleData.author_id;
      }
      console.log(articleData);
      const response = await Api.post('/edit/articles', articleData);
      return response
  } catch (error) {
      console.error(error)
  }
}

export const updateArticle = async (id, articleData) => {
  try {
    if (articleData.section_id == 0) { 
      delete articleData.section_id; 
      articleData.static_page = true 
    } else {
      articleData.static_page = false
    }
    if (articleData.author_id == 0) { 
      delete articleData.author_id;
    }
    const response = await Api.put(`/edit/articles/${id}`, articleData);
    return response
  } catch (error) {
      console.error(error)
  }
}

// article list methods
export const getArticlesToEdit = async (section) => {
  console.log(`section: ${section}`);
  const url = section ? `/edit/sections/${section}/articles` : `/edit/articles`
  try {
    const resp = await Api.get(url)
    console.log(resp)
    return resp.data
  } catch (error) {
    throw error
  }
}

// page list methods
export const getPages = async () => {
  try {
    const resp = await Api.get('/edit/pages');
    return resp.data
  } catch (error) {
    throw error
  }
}

// section methods
export const addNewSection = async (sectionData) => {
  try {
    const resp = await Api.post(`/edit/sections`, sectionData)
    return resp
  } catch (error) {
    throw error
  }
}

export const getSectionToEdit = async (id) => {
  try {
    const resp = await Api.get(`/edit/sections/${id}`)
    return resp.data
  } catch (error) {
    throw error
  }
}

export const updateTopStory = async (section_id,article_id) => {
  try {
    const resp = await Api.put(`/edit/sections/${section_id}`, {"top_story": article_id})
    return resp.data
  } catch (error) {
    throw error
  }
}

// feature methods

export const getFeatures = async () => {
  try {
    const resp = await Api.get(`edit/features/`)
    return resp.data
  } catch (error) {
    throw (error)
  }  
}

export const addFeatured = async (section_id,article_id) => {
  try {
    const resp = await Api.post(`edit/features/`, { "article_id": article_id, "section_id": section_id })
    return resp.data
  } catch (error) {
    throw (error)
  }
}

export const removeFeatured = async (feature_id) => {
  try {
    const resp = await Api.delete(`edit/features/${feature_id}`)
    return resp.data
  } catch (error) {
    throw (error)
  }
}

// export const getAdditionalMovies = async page => {
//   try {
//     const resp = await Api.get(`/discover/movie/?page=${page}&${apiKey}`)
//     return resp.data.results
//   } catch (error) {
//     throw error
//   }
// }
